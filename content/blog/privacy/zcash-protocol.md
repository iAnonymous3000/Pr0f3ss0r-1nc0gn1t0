---
title: "Zcash Protocol Deep Dive: The Cryptography Behind Financial Privacy"
description: "A comprehensive technical analysis of the Zcash protocol (v2025.6.1), covering zk-SNARKs, Halo 2, the Lockbox funding model, and the evolution of privacy from Sprout to Orchard."
tags: ["zcash", "cryptography", "zk-SNARKs", "privacy", "blockchain", "protocol analysis", "halo 2", "zero-knowledge"]
draft: false
---

## Abstract

Zcash represents one of the most sophisticated implementations of cryptographic privacy in production blockchain systems. Built on the theoretical foundations of the Zerocash protocol, Zcash employs zero-knowledge succinct non-interactive arguments of knowledge (zk-SNARKs) to enable fully private transactions while maintaining the integrity guarantees of a public ledger.

This technical deep dive examines the Zcash protocol specification (Version 2025.6.1), covering its cryptographic primitives, privacy architecture, zero-knowledge proof systems, and the evolution from Sprout through Sapling to Orchard. We analyze the mathematical foundations, security properties, and design decisions that make Zcash a reference implementation for blockchain privacy.

---

## Table of Contents

- [1. Introduction: The Privacy Problem](#1-introduction-the-privacy-problem)
- [2. Zcash Architecture Overview](#2-zcash-architecture-overview)
- [3. The Dual Payment System](#3-the-dual-payment-system)
- [4. Core Privacy Primitives](#4-core-privacy-primitives)
- [5. The Three Shielded Protocols](#5-the-three-shielded-protocols)
- [6. Zero-Knowledge Proof Systems](#6-zero-knowledge-proof-systems)
- [7. Key Architecture and Derivation](#7-key-architecture-and-derivation)
- [8. Cryptographic Building Blocks](#8-cryptographic-building-blocks)
- [9. Transaction Structure and Validation](#9-transaction-structure-and-validation)
- [10. Security Analysis](#10-security-analysis)
- [11. Network Upgrades](#11-network-upgrades)
- [12. Conclusion](#12-conclusion)

---

## 1. Introduction: The Privacy Problem

### 1.1 Bitcoin's Transparency Problem

Bitcoin, despite popular misconception, is not anonymous—it is pseudonymous. Every transaction is permanently recorded on a public ledger, creating a complete transaction graph that links addresses through their spending patterns. Research has repeatedly demonstrated that this transparency, combined with off-chain data sources, enables deanonymization of users through:

- **Transaction graph analysis**: Clustering algorithms identify addresses controlled by the same entity
- **Amount correlation**: Matching input/output amounts across transactions
- **Timing analysis**: Transaction timing patterns reveal behavioral signatures
- **Exchange KYC linkage**: On-ramps and off-ramps connect pseudonyms to identities

The implications extend beyond individual privacy. Financial surveillance at scale becomes trivial, and the fungibility of Bitcoin is compromised—coins with "tainted" histories may be rejected or discounted.

### 1.2 The Zerocash Solution

In 2014, Eli Ben-Sasson, Alessandro Chiesa, Christina Garman, Matthew Green, Ian Miers, Eran Tromer, and Madars Virza published the Zerocash paper, proposing a cryptocurrency protocol that achieves:

- **Payment anonymity**: Transactions reveal nothing about sender, recipient, or amount
- **Full fungibility**: All coins are cryptographically indistinguishable
- **Decentralization**: No trusted parties required for transaction validation
- **Efficiency**: Practical proof generation and verification times

Zcash launched on October 28, 2016, as the first production implementation of these ideas, with significant security fixes and performance improvements over the original paper.

### 1.3 The Zcash Ecosystem (2025)

The Zcash ecosystem has matured into a multi-organization structure:

| Organization | Focus | Key Projects |
|--------------|-------|--------------|
| **Electric Coin Company (ECC)** | Wallet UX, US regulatory engagement | Zashi (reference wallet), protocol R&D |
| **Zcash Foundation** | Node infrastructure, governance | Zebra (Rust node), FROST threshold signatures |
| **Shielded Labs** | Protocol evolution, consensus R&D | Crosslink (hybrid PoS), network upgrades |

**Reference Implementations:**

- **Zashi**: ECC's modern wallet emphasizing usability; the primary user-facing reference for shielded transactions
- **Zebra**: The Foundation's Rust implementation of a full node, now fully consensus-compatible with `zcashd` and improving network resilience through client diversity
- **zcashd**: The original C++ node (ECC), still widely deployed

### 1.4 Document Scope

This analysis is based on the Zcash Protocol Specification Version 2025.6.1 [NU6.1], the authoritative technical document maintained collaboratively by Zcash ecosystem contributors. We examine the protocol as implemented through the NU6 network upgrade (activated November 2024), with discussion of the current NU6.1 changes.

---

## 2. Zcash Architecture Overview

### 2.1 High-Level Design

Zcash extends Bitcoin's architecture with a parallel shielded payment system. The key insight is that while Bitcoin transactions explicitly encode value transfers (input addresses → output addresses with amounts), Zcash shielded transactions prove that a valid transfer occurred without revealing any details.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ZCASH BLOCKCHAIN                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────────┐         ┌─────────────────────────────────┐   │
│   │  TRANSPARENT POOL   │         │        SHIELDED POOLS           │   │
│   │                     │         │                                 │   │
│   │  • Bitcoin-style    │◄───────►│  ┌─────────┐     ┌─────────┐    │   │
│   │  • Public amounts   │ (amount │  │ Sprout  │     │ Sapling │    │   │
│   │  • Visible addresses│ visible)│  │(legacy) │     │(active) │    │   │
│   │  • Traceable        │         │  └────┬────┘     └────┬────┘    │   │
│   │                     │         │       │               │         │   │
│   └─────────────────────┘         │       │  ┌─────────┐  │         │   │
│            ▲                      │       └──│ Orchard │──┘         │   │
│            │                      │          │(current)│            │   │
│            │                      │          └─────────┘            │   │
│            │                      │     (inter-pool: amount visible)│   │
│            │                      │                                 │   │
│            │                      │  • Hidden amounts               │   │
│            │                      │  • Hidden addresses             │   │
│            │                      │  • Unlinkable transfers         │   │
│            │                      └─────────────────────────────────┘   │
│            │                                                            │
│   ┌────────┴────────┐                                                   │
│   │ LOCKBOX (ZIP2001)│  ◄── 20% of block rewards (NU6+)                 │
│   │                 │                                                   │
│   │ Protocol-controlled; awaits decentralized grant distribution        │
│   └─────────────────┘                                                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

PRIVACY GUARANTEES BY TRANSACTION TYPE:

  Transparent → Transparent:  No privacy (fully public, like Bitcoin)
  Transparent → Shielded:     Amount visible at entry point only
  Shielded → Shielded:        Full privacy (same pool)
  Shielded → Shielded:        Amount visible (cross-pool, e.g., Sapling→Orchard)
  Shielded → Transparent:     Amount visible at exit point only
```

### 2.2 Chain Value Pools

Zcash maintains separate **chain value pools**:

| Pool | Description | Privacy Level |
|------|-------------|---------------|
| **Transparent** | Bitcoin-compatible UTXOs | None (fully public) |
| **Sprout** | Original shielded pool (deprecated; quarantined in modern wallets) | Full |
| **Sapling** | Primary shielded pool for most users | Full |
| **Orchard** | Latest shielded pool (NU5+), preferred for new transactions | Full |
| **Lockbox (ZIP 2001)** | Protocol-controlled fund accumulating development funding | N/A |

The **Lockbox** (introduced in NU6) is distinct from user-accessible pools. It accumulates a portion of block rewards for future development grants, effectively holding funds in a "holding pattern" until a decentralized grant mechanism (per ZIP 1016) distributes them. Unlike Sprout/Sapling/Orchard, users cannot directly transact with the Lockbox.

Value can move between user pools, but **cross-pool transfers always reveal the amount transferred**. This is a fundamental constraint—the system cannot hide what doesn't exist in the destination pool's commitment tree.

### 2.3 Consensus Model

Zcash inherits Bitcoin's Nakamoto consensus with modifications:

- **Proof of Work**: Equihash (memory-hard, ASIC-resistant design intent)
- **Block Time**: 75 seconds (post-Blossom)
- **Difficulty Adjustment**: Per-block adjustment with damping
- **Supply**: 21 million ZEC maximum, with halving schedule

---

## 3. The Dual Payment System

### 3.1 Transparent Transactions

Transparent transactions operate identically to Bitcoin:

```
Transparent Input(s)          Transparent Output(s)
┌──────────────────┐          ┌──────────────────┐
│ Previous TxID    │          │ Value (satoshis) │
│ Output Index     │    ───►  │ scriptPubKey     │
│ scriptSig        │          └──────────────────┘
│ Sequence         │
└──────────────────┘
```

These use standard Bitcoin script for authorization (P2PKH, P2SH, etc.) and provide no privacy beyond pseudonymity.

### 3.2 Shielded Transactions

Shielded transactions replace explicit value transfers with cryptographic proofs:

```
Shielded Input(s)             Shielded Output(s)
┌──────────────────┐          ┌──────────────────┐
│ Nullifier        │          │ Note Commitment  │
│ Anchor           │    ───►  │ Encrypted Note   │
│ zk-SNARK Proof   │          │ Ephemeral Key    │
│ Signatures       │          └──────────────────┘
└──────────────────┘

What's proven (not revealed):
• Input notes exist in the commitment tree
• Prover knows the spending keys
• Input values = Output values + fees
• Nullifiers computed correctly
```

### 3.3 Transaction Value Balance

For any valid transaction, the following invariant holds:

$$\sum_{i} v_{in,i}^{transparent} + \sum_{j} v_{in,j}^{shielded} = \sum_{k} v_{out,k}^{transparent} + \sum_{l} v_{out,l}^{shielded} + fee$$

In practice, v5 transactions handle this through the `valueBalance` fields in each shielded bundle. The `valueBalanceSapling` and `valueBalanceOrchard` fields represent the net value flowing *out of* each shielded pool into the transparent pool. A positive `valueBalance` means shielded value is being unshielded; a negative value means transparent value is being shielded. The transaction fee is implicitly the remaining transparent value not consumed by outputs:

$$fee = \sum_{i} v_{in,i}^{transparent} - \sum_{k} v_{out,k}^{transparent} + valueBalance^{Sapling} + valueBalance^{Orchard}$$

The shielded components use **homomorphic commitments** (Sapling/Orchard) or **explicit balance proofs** (Sprout) to verify this equation without revealing individual values.

---

## 4. Core Privacy Primitives

### 4.1 Notes

In Zcash, value is carried by **notes**—the shielded equivalent of UTXOs. A note is not a "coin" in the physical sense but a tuple of cryptographic values that represent spendable funds.

#### Sprout Note Structure

$$n_{Sprout} = (a_{pk}, v, \rho, rcm)$$

Where:

- $a_{pk} \in \mathbb{B}^{256}$ — paying key of recipient's address
- $v \in \lbrace 0, \ldots, MAX\_MONEY \rbrace$ — value in zatoshi (1 ZEC = $10^8$ zatoshi)
- $\rho \in \mathbb{B}^{256}$ — nullifier randomness
- $rcm$ — random commitment trapdoor

#### Sapling Note Structure

$$n_{Sapling} = (d, pk_d, v, rcm)$$

Where:

- $d \in \mathbb{B}^{88}$ — diversifier
- $pk_d \in \mathbb{J}^{(r)*}$ — diversified transmission key (Jubjub curve point)
- $v \in \lbrace 0, \ldots, MAX\_MONEY \rbrace$ — value in zatoshi
- $rcm \in \mathbb{F}_{r_{\mathbb{J}}}$ — commitment trapdoor

#### Orchard Note Structure

$$n_{Orchard} = (d, pk_d, v, \rho, \psi, rcm)$$

Where:

- $d \in \mathbb{B}^{88}$ — diversifier
- $pk_d \in \mathbb{P}$ — diversified transmission key (Pallas curve point)
- $v \in \lbrace 0, \ldots, 2^{64}-1 \rbrace$ — value in zatoshi
- $\rho \in \mathbb{F}_{q_{\mathbb{P}}}$ — nullifier randomness
- $\psi \in \mathbb{F}_{q_{\mathbb{P}}}$ — additional nullifier randomness
- $rcm$ — commitment trapdoor

### 4.2 Note Commitments

When a note is created, only a **commitment** to its contents is published on-chain. This commitment is:

1. **Binding**: Cannot find two different notes with the same commitment
2. **Hiding**: Commitment reveals nothing about the note contents

#### Sprout Note Commitment

$$cm = NoteCommit_{rcm}^{Sprout}(a_{pk}, v, \rho)$$

Using SHA-256 compression:

$$cm = SHA256Compress(SHA256Compress([1]^{192} \| a_{pk}[0..63]) \| a_{pk}[64..255] \| v \| \rho)[0..255]$$

Then:

$$cm = SHA256Compress(cm \| rcm)$$

#### Sapling Note Commitment

$$cm = NoteCommit_{rcm}^{Sapling}(repr_{\mathbb{J}}(g_d), repr_{\mathbb{J}}(pk_d), v)$$

Where:

- $g_d = DiversifyHash^{Sapling}(d)$ — the diversified base point
- The commitment uses **Windowed Pedersen Commitments** for efficiency

The Pedersen commitment has the form:

$$cm = [rcm] \cdot \mathcal{H} + Pedersen(repr_{\mathbb{J}}(g_d) \| repr_{\mathbb{J}}(pk_d) \| v)$$

Where $\mathcal{H}$ is a nothing-up-my-sleeve generator point.

#### Orchard Note Commitment

$$cm = NoteCommit_{rcm}^{Orchard}(repr_{\mathbb{P}}(g_d), repr_{\mathbb{P}}(pk_d), v, \rho, \psi)$$

Using **Sinsemilla** hash function for improved circuit efficiency:

$$cm = SinsemillaCommit_{rcm}(repr_{\mathbb{P}}(g_d) \| repr_{\mathbb{P}}(pk_d) \| I2LEBSP_{64}(v) \| \rho \| \psi)$$

### 4.3 Note Commitment Trees

All note commitments are inserted into an **incremental Merkle tree**:

```
                    Root (Anchor)
                    /            \
                   /              \
               H(0,1)            H(2,3)
               /    \            /    \
            H(0)   H(1)       H(2)   H(3)
             |      |          |      |
           cm_0   cm_1       cm_2   cm_3
```

Each protocol maintains its own tree:

| Protocol | Tree Depth | Max Notes | Hash Function |
|----------|------------|-----------|---------------|
| Sprout | 29 | ~537 million | SHA-256 |
| Sapling | 32 | ~4.3 billion | Pedersen Hash |
| Orchard | 32 | ~4.3 billion | Sinsemilla |

The **Merkle root** (called an **anchor**) uniquely identifies the state of the commitment tree at a point in time.

#### Merkle Path Verification

To prove a commitment exists in the tree, the spender provides a **Merkle path**—the sequence of sibling hashes from leaf to root:

$$path = \left[ M_{sibling(h,i)}^h \text{ for } h \text{ from } MerkleDepth \text{ down to } 1 \right]$$

Where:

$$sibling(h, i) = \left\lfloor \frac{i}{2^{MerkleDepth-h}} \right\rfloor \oplus 1$$

Verification recomputes the root from the leaf:

$$M_i^h = MerkleCRH(h, M_{2i}^{h+1}, M_{2i+1}^{h+1})$$

### 4.4 Nullifiers

The **nullifier** is the key innovation enabling double-spend prevention without linkability. Each note has exactly one valid nullifier, computed from secret values known only to the note's owner.

#### The Double-Spend Problem

Without nullifiers, preventing double-spends would require either:

1. Revealing which commitment is being spent (breaks privacy)
2. Trusting a central party to track spent notes (breaks decentralization)

#### Nullifier Construction

**Sprout:**

$$nf = PRF_{a_{sk}}^{nf}(\rho)$$

**Sapling:**

$$nf = PRF_{nk^{\ast}}^{nfSapling}(\rho^{\ast})$$

Where:

- $nk^{\ast} = repr_{\mathbb{J}}(nk)$ — serialized nullifier deriving key
- $\rho^{\ast} = repr_{\mathbb{J}}(MixingPedersenHash(cm, pos))$
- $pos$ — the note's position in the commitment tree

**Orchard:**

$$nf = DeriveNullifier_{nk}(\rho, \psi, cm)$$

Using Poseidon hash:

$$nf = Extract_{\mathbb{P}}([PRF_{nk}^{nfOrchard}(\rho) + \psi] \cdot \mathcal{K} + cm)$$

Where $\mathcal{K}$ is a generator point for the nullifier base.

#### Nullifier Set

The blockchain maintains a **nullifier set** for each shielded protocol. When a transaction is mined:

1. All nullifiers in the transaction are checked against the set
2. If any nullifier already exists → **reject** (double-spend attempt)
3. Otherwise, add all nullifiers to the set

This ensures each note can only be spent once, without revealing which commitment corresponds to which nullifier.

### 4.5 Note Traceability Sets

A critical privacy property is the **note traceability set**—the set of possible source notes for any given spend.

In Zcash, when spending a note, the spender proves knowledge of:

- A valid note commitment somewhere in the tree
- The spending authority for that note
- Correct nullifier computation

But the proof does **not** reveal which commitment. From an observer's perspective, the spent note could be **any** note in the commitment tree that the observer doesn't know to be spent.

**Comparison with other privacy schemes:**

| System | Anonymity Set Size |
|--------|-------------------|
| Bitcoin (no mixing) | 1 |
| CoinJoin | Participants in mix (~3-100) |
| CryptoNote/Monero | Ring size (~11-16) |
| **Zcash** | **All unspent shielded notes** (~millions) |

This is a fundamental architectural advantage—Zcash's anonymity set grows with every shielded transaction ever made.

---

## 5. The Three Shielded Protocols

### 5.1 Sprout (2016-2018)

Sprout was Zcash's original shielded protocol, designed for correctness over efficiency.

#### JoinSplit Transfers

Sprout uses **JoinSplit** operations that consume up to 2 input notes and produce up to 2 output notes:

```
            JoinSplit Transfer
     ┌─────────────────────────────┐
     │                             │
 n_1 ──►┌─────────────────────┐    │
     │  │                     │────►── n'_1
 n_2 ──►│   zk-SNARK Proof    │    │
     │  │                     │────►── n'_2
v_pub^old──►│                     │    │
     │  │   Proves:           │────►── v_pub^new
     │  │   • Notes exist     │    │
     │  │   • Know spend key  │    │
     │  │   • Values balance  │    │
     │  └─────────────────────┘    │
     │                             │
     └─────────────────────────────┘
```

#### Balance Equation (Inside Proof)

$$v_1^{old} + v_2^{old} + v_{pub}^{old} = v_1^{new} + v_2^{new} + v_{pub}^{new}$$

The transparent values $v_{pub}^{old}$ and $v_{pub}^{new}$ allow value to enter/exit the shielded pool.

#### Sprout Limitations

1. **Performance**: Proof generation took ~40 seconds
2. **Circuit size**: ~2 million constraints
3. **No viewing keys**: Cannot delegate read access without spending authority
4. **Fixed structure**: Always 2 inputs, 2 outputs (dummy notes required for padding)

### 5.2 Sapling (2018-2020)

The Sapling upgrade (activated October 2018) was a complete redesign optimizing for performance and functionality.

#### Key Improvements

| Aspect | Sprout | Sapling |
|--------|--------|---------|
| Proof time | ~40 seconds | ~7 seconds |
| Proof size | 296 bytes | 192 bytes |
| Memory (proving) | ~3 GB | ~40 MB |
| Viewing keys | No | Yes |
| Diversified addresses | No | Yes |

#### Separated Spend and Output Proofs

Instead of JoinSplit's monolithic proof, Sapling uses separate circuits:

**Spend Description** (one per input):

- Proves knowledge of a spendable note
- Reveals: nullifier, value commitment, anchor

**Output Description** (one per output):

- Proves correct note construction
- Reveals: note commitment, value commitment, encrypted note

```
Transaction with 3 inputs, 2 outputs:

┌─────────────────────────────────────────────────────────┐
│                    Sapling Bundle                        │
├─────────────────────────────────────────────────────────┤
│  Spend Description 1    │  Output Description 1         │
│  ├─ nullifier          │  ├─ note commitment (cm_u)    │
│  ├─ value commitment   │  ├─ value commitment          │
│  ├─ anchor             │  ├─ ephemeral key             │
│  ├─ zk-SNARK proof     │  ├─ encrypted note            │
│  └─ spend auth sig     │  └─ zk-SNARK proof            │
├─────────────────────────┼───────────────────────────────┤
│  Spend Description 2    │  Output Description 2         │
│  └─ ...                │  └─ ...                       │
├─────────────────────────┼───────────────────────────────┤
│  Spend Description 3    │                               │
│  └─ ...                │                               │
├─────────────────────────┴───────────────────────────────┤
│  Binding Signature (proves balance)                     │
│  valueBalance (transparent value change)                │
└─────────────────────────────────────────────────────────┘
```

#### Homomorphic Value Commitments

Sapling's balance is verified using Pedersen commitments' homomorphic property:

$$ValueCommit_{rcv}^{Sapling}(v) = [rcv] \cdot \mathcal{R} + [v] \cdot \mathcal{V}$$

Where:

- $\mathcal{R}, \mathcal{V}$ are generator points on Jubjub
- $rcv$ is a random commitment trapdoor

**Homomorphic property:**

$$Commit(v_1) + Commit(v_2) = Commit(v_1 + v_2)$$

This allows balance verification without individual value revelation:

$$\sum_i cv_i^{spend} - \sum_j cv_j^{output} = [bsk] \cdot \mathcal{R} + [v_{balance}] \cdot \mathcal{V}$$

The **binding signature** proves knowledge of $bsk = \sum rcv^{spend} - \sum rcv^{output}$, confirming balance.

### 5.3 Orchard (2021-Present)

Orchard, activated with NU5 (May 2022), introduces Halo 2—eliminating trusted setup requirements.

#### Action-Based Design

Orchard merges spends and outputs into **Actions**, each potentially containing one spend and one output:

```
┌────────────────────────────────────────┐
│            Action Description           │
├────────────────────────────────────────┤
│  Spend-side:          Output-side:     │
│  ├─ nullifier         ├─ cm_x          │
│  ├─ rk (randomized    ├─ ephemeral key │
│  │   validating key)  ├─ encrypted note│
│  └─ spend auth sig    └─ encrypted out │
├────────────────────────────────────────┤
│  Shared:                               │
│  ├─ cv_net (net value commitment)      │
│  └─ (proof aggregated separately)      │
└────────────────────────────────────────┘
```

**Key difference**: Each Action has a **net value commitment** (input value minus output value), rather than separate commitments. This provides additional privacy by hiding which Actions are "mostly spends" vs "mostly outputs."

#### Halo 2: No Trusted Setup

The most significant change is the proving system. While BCTV14 and Groth16 require a **trusted setup ceremony** (where toxic waste must be destroyed), Halo 2 uses a **transparent setup**:

| Property | Groth16 | Halo 2 |
|----------|---------|--------|
| Trusted setup | Required | **Not required** |
| Proof size | 192 bytes | ~5 KB (aggregated) |
| Verification | ~6 ms | ~variable |
| Quantum resistance | None | None |
| Curve | BLS12-381 | Pallas/Vesta |

#### Circuit Changes

Orchard's Action circuit proves (for each Action):

1. **Spend side** (if enabled):
   - Note exists in commitment tree with anchor $rt^{Orchard}$
   - Prover knows the spending key for the note
   - Nullifier computed correctly

2. **Output side** (if enabled):
   - Note commitment computed correctly
   - Encrypted note matches commitment

3. **Both**:
   - Net value commitment is correct: $cv_{net} = Commit(v_{spend} - v_{output})$

---

## 6. Zero-Knowledge Proof Systems

### 6.1 What zk-SNARKs Prove

A zk-SNARK (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) allows a prover to convince a verifier that:

1. The prover knows a secret **witness** $w$
2. A public **statement** $x$ is true with respect to $w$
3. **Without revealing** $w$

Formally, for a relation $\mathcal{R}$:

- Prover has $(x, w)$ such that $(x, w) \in \mathcal{R}$
- Verifier learns only that $\exists w: (x, w) \in \mathcal{R}$

### 6.2 Security Properties

Zcash's proving systems satisfy:

#### Completeness

An honest prover always convinces an honest verifier:

$$\forall (x, w) \in \mathcal{R}: \Pr[Verify(vk, x, Prove(pk, x, w)) = 1] = 1$$

#### Knowledge Soundness

A cheating prover cannot convince without knowing a valid witness:

$$\forall \mathcal{A}: \Pr[Verify(vk, x, \pi) = 1 \land \nexists w: (x, w) \in \mathcal{R}] \approx 0$$

More precisely, there exists an **extractor** that can recover $w$ from any successful prover.

#### Statistical Zero Knowledge

Proofs reveal nothing beyond statement truth. There exists a simulator $\mathcal{S}$ producing indistinguishable "fake" proofs:

$$\lbrace Prove(pk, x, w) \rbrace_{(x,w) \in \mathcal{R}} \approx \lbrace Simulate(x) \rbrace_{x}$$

### 6.3 BCTV14 (Sprout, pre-Sapling)

The original Zcash used BCTV14 [Ben-Sasson et al., 2014] with the BN-254 pairing curve.

**Characteristics:**

- Proof size: 296 bytes (8 group elements)
- Verification: 3 pairings + multi-exponentiation
- Trusted setup: Required (Powers of Tau + circuit-specific)

**Security assumption**: Hardness of the q-Power Knowledge of Exponent (q-PKE) assumption.

### 6.4 Groth16 (Sprout post-Sapling, Sapling)

Groth16 [Groth, 2016] replaced BCTV14 for improved efficiency:

**Proof structure:**

$$\pi = (A, B, C) \in \mathbb{G}_1 \times \mathbb{G}_2 \times \mathbb{G}_1$$

**Verification equation:**

$$e(A, B) = e(\alpha, \beta) \cdot e(L, \gamma) \cdot e(C, \delta)$$

Where:

- $e: \mathbb{G}_1 \times \mathbb{G}_2 \rightarrow \mathbb{G}_T$ is the pairing
- $L$ encodes the public inputs
- $\alpha, \beta, \gamma, \delta$ are from the trusted setup

**Improvements over BCTV14:**

- Proof size: 192 bytes (3 group elements)
- Verification: 3 pairings (more efficient)
- Proving: ~3x faster

Zcash uses Groth16 with **BLS12-381**, a pairing-friendly curve with 128-bit security.

### 6.5 Halo 2 (Orchard)

Halo 2 [Bowe et al., 2019] is a recursive proof composition scheme using:

1. **PLONKish arithmetization**: More flexible than R1CS
2. **Polynomial commitment**: Based on Inner Product Argument (IPA)
3. **Pasta curves**: Pallas and Vesta (a 2-cycle for efficient recursion)

#### No Trusted Setup

The key breakthrough is replacing pairings with IPA:

- Pairings require structured reference strings (toxic waste)
- IPA requires only a random group element (can be derived from hash)

**Trade-off**: Larger proofs (~5 KB vs 192 bytes), but:

- Proofs can be **aggregated** (many proofs → one verification)
- No trusted setup ceremony required
- Enables future **recursive proofs** (proofs that verify other proofs)

### 6.6 Circuit Sizes

| Circuit | Constraints | Purpose |
|---------|-------------|---------|
| JoinSplit (Sprout) | ~2,000,000 | 2-in, 2-out transfer |
| Spend (Sapling) | ~98,000 | Single spend |
| Output (Sapling) | ~26,000 | Single output |
| Action (Orchard) | ~variable | Single action |

---

## 7. Key Architecture and Derivation

### 7.1 Overview

Zcash's key hierarchy enables flexible access control:

```
                    ┌──────────────────┐
                    │   Spending Key   │
                    │       (sk)       │
                    └────────┬─────────┘
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
    ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
    │ Spend Auth Key│ │ Nullifier Key │ │  Outgoing VK  │
    │    (ask)      │ │    (nsk/nk)   │ │    (ovk)      │
    └───────┬───────┘ └───────┬───────┘ └───────────────┘
            │                 │
            ▼                 ▼
    ┌───────────────┐ ┌───────────────┐
    │ Spend Valid.  │ │  Nullifier    │
    │  Key (ak)     │ │ Deriving Key  │
    └───────┬───────┘ └───────┬───────┘
            │                 │
            └────────┬────────┘
                     ▼
            ┌───────────────────┐
            │ Full Viewing Key  │
            │   (ak, nk, ovk)   │
            └────────┬──────────┘
                     │
                     ▼
            ┌───────────────────┐
            │ Incoming Viewing  │
            │    Key (ivk)      │
            └────────┬──────────┘
                     │
           ┌─────────┴──────────┐
           │   + diversifier d  │
           ▼                    ▼
    ┌──────────────┐    ┌──────────────┐
    │  Payment     │    │  Payment     │
    │ Address (d₁) │    │ Address (d₂) │  ... (unlimited)
    └──────────────┘    └──────────────┘
```

### 7.2 Sapling Key Derivation

Starting from a random spending key $sk \in \mathbb{B}^{256}$:

#### Expanded Spending Key

$$ask = ToScalar^{Sapling}(PRF^{expand}_{sk}([0x00]))$$

$$nsk = ToScalar^{Sapling}(PRF^{expand}_{sk}([0x01]))$$

$$ovk = truncate_{32}(PRF^{expand}_{sk}([0x02]))$$

Where $ToScalar^{Sapling}(x) = LEOS2IP_{512}(x) \mod r_{\mathbb{J}}$

#### Proof Authorizing Key

$$ak = SpendAuthSig^{Sapling}.DerivePublic(ask) = [ask] \cdot \mathcal{P}^{Sapling}_{G}$$

$$nk = [nsk] \cdot \mathcal{H}^{Sapling}$$

#### Incoming Viewing Key

$$ivk = CRH^{ivk}(repr_{\mathbb{J}}(ak), repr_{\mathbb{J}}(nk))$$

Using BLAKE2s with parameter block modifications:

$$ivk = BLAKE2s_{256}(\text{"Zcash\_ivk"}, ak \| nk) \mod 2^{251}$$

#### Diversified Payment Address

For diversifier $d \in \mathbb{B}^{88}$:

$$g_d = DiversifyHash^{Sapling}(d)$$

$$pk_d = [ivk] \cdot g_d$$

$$addr = (d, pk_d)$$

The diversifier is hashed to a curve point using:

$$g_d = GroupHash^{\mathbb{J}}(\text{"Zcash\_gd"}, \text{"Zcash\_G\_"}, d)$$

If $g_d = \bot$ (not on curve), choose a different $d$.

### 7.3 Orchard Key Derivation

Orchard modifies the structure for Halo 2 compatibility:

$$ask = ToScalar^{Orchard}(PRF^{expand}_{sk}([0x06]))$$

$$nk = ToBase^{Orchard}(PRF^{expand}_{sk}([0x07]))$$

$$rivk = ToScalar^{Orchard}(PRF^{expand}_{sk}([0x08]))$$

Where:

- $ToBase^{Orchard}(x) = LEOS2IP_{512}(x) \mod q_{\mathbb{P}}$
- $ToScalar^{Orchard}(x) = LEOS2IP_{512}(x) \mod r_{\mathbb{P}}$

#### Full Viewing Key

$$ak = [ask] \cdot \mathcal{P}^{Orchard}_{G}$$

$$fvk = (ak, nk, rivk)$$

#### Incoming Viewing Key

$$dk = truncate_{32}(PRF^{expand}_{sk}([0x07]))$$

$$ivk = Commit^{ivk}_{rivk}(ak, nk) \mod r_{\mathbb{P}}$$

### 7.4 Viewing Key Capabilities

| Key Type | Can View Incoming | Can View Outgoing | Can Spend |
|----------|-------------------|-------------------|-----------|
| Spending Key | ✓ | ✓ | ✓ |
| Full Viewing Key | ✓ | ✓ | ✗ |
| Incoming Viewing Key | ✓ | ✗ | ✗ |
| Payment Address | ✗ | ✗ | ✗ |

**Use cases:**

- **Full Viewing Key**: Auditors, tax compliance, business accounting
- **Incoming Viewing Key**: Watch-only wallets, payment verification
- **Diversified Addresses**: Unlinkable receiving addresses per payer

---

## 8. Cryptographic Building Blocks

### 8.1 Hash Functions

#### SHA-256 and BLAKE2

**SHA-256** (Sprout): Standard NIST hash

$$H: \lbrace 0,1 \rbrace^{\ast} \rightarrow \lbrace 0,1 \rbrace^{256}$$

**BLAKE2b** (Sapling): Personalized keyed hash

$$BLAKE2b_{512}(\text{"Zcash\_..."}, x)$$

**BLAKE2s** (Sapling): For shorter outputs

$$BLAKE2s_{256}(\text{"Zcash\_..."}, x)$$

#### Pedersen Hash (Sapling)

Pedersen hashing maps bit strings to curve points:

$$PedersenHash(D, M) = \sum_{i=0}^{n-1} [enc(m_i)] \cdot \mathcal{P}_{D,i}$$

Where:

- $M$ is split into 3-bit chunks $m_i$
- $enc(m) = m - 4$ for $m \in \lbrace 0,\ldots,7 \rbrace$ (range $[-4, 3]$)
- $\mathcal{P}_{D,i}$ are independent generator points

The window structure uses 4 generators per segment:

$$Segment_j = \sum_{k=0}^{c-1} [enc(m_{jc+k}) \cdot 2^{4k}] \cdot \mathcal{P}_{D,j}$$

#### Sinsemilla Hash (Orchard)

Sinsemilla is optimized for circuit efficiency using incomplete addition:

$$SinsemillaHash(D, M) = Q + \sum_{i=0}^{n-1} hash\_to\_curve(m_i)$$

Where:

- $M$ is split into 10-bit chunks
- Each chunk indexes into a precomputed table of curve points
- $Q$ is a domain-specific generator

**Advantage**: No complete addition required in-circuit, reducing constraints.

#### Poseidon Hash (Orchard)

Poseidon is an algebraic hash optimized for zkSNARKs:

$$Poseidon_{width}(x_1, \ldots, x_w) = ARK \circ S \circ MDS \circ \ldots \circ ARK(x_1, \ldots, x_w)$$

Where:

- ARK: Add Round Key (constants)
- S: S-box ($x \mapsto x^5$)
- MDS: Maximum Distance Separable mixing matrix

Orchard uses Poseidon for PRF operations where algebraic structure is advantageous.

### 8.2 Elliptic Curves

#### BN-254 (Sprout)

A pairing-friendly curve with embedding degree 12:

$$y^2 = x^3 + 3$$

Over $\mathbb{F}_p$ where $p$ is a 254-bit prime.

**Security note**: BN-254 provides approximately 100 bits of security due to advances in discrete log attacks on pairing curves (notably the Kim-Barbulescu attack). This reduced security margin, combined with the deprecated status of the Sprout protocol, means that **modern wallets like Zashi effectively quarantine Sprout funds**—users are strongly encouraged to migrate any remaining Sprout ZEC to Sapling or Orchard pools.

#### BLS12-381 (Sapling)

A more secure pairing curve:

$$E: y^2 = x^3 + 4$$

Parameters:

- $p$: 381-bit prime
- $r$: 255-bit subgroup order
- Security: ~128 bits

#### Jubjub (Sapling)

A twisted Edwards curve embedded in BLS12-381's scalar field:

$$-u^2 + v^2 = 1 + d \cdot u^2 \cdot v^2$$

Where $d = -(10240/10241)$ over $\mathbb{F}_r$ (BLS12-381 scalar field).

**Properties:**

- Complete addition formula (no exceptional cases)
- Efficient in-circuit arithmetic
- Cofactor $h = 8$

#### Pallas and Vesta (Orchard)

A **2-cycle** of curves for recursive proofs:

**Pallas** (primary):

$$E_p: y^2 = x^3 + 5$$ over $\mathbb{F}_p$

**Vesta**:

$$E_q: y^2 = x^3 + 5$$ over $\mathbb{F}_q$

Where $q = r_p$ (Vesta's base field = Pallas's scalar field) and vice versa.

This cycle enables **recursive composition**: a Pallas proof can verify a Vesta proof, and vice versa.

### 8.3 Commitment Schemes

#### Windowed Pedersen Commitment (Sapling)

$$Commit_r(x) = [r] \cdot \mathcal{H} + PedersenHash(D, x)$$

**Properties:**

- Computationally hiding (under DLog assumption)
- Perfectly binding
- Homomorphic: $Commit_r(x) + Commit_s(y) = Commit_{r+s}(x+y)$

#### Sinsemilla Commitment (Orchard)

$$SinsemillaCommit_r(D, M) = SinsemillaHash(D, M) + [r] \cdot \mathcal{R}$$

### 8.4 Signature Schemes

#### RedDSA (Sapling/Orchard)

A Schnorr-based signature with re-randomizable keys:

**Key Generation:**

$$sk \leftarrow \lbrace 1, \ldots, r-1 \rbrace$$

$$pk = [sk] \cdot \mathcal{B}$$

**Signing:**

$$T \leftarrow random()$$

$$r = H(T \| pk \| M)$$

$$R = [r] \cdot \mathcal{B}$$

$$S = r + H(R \| pk \| M) \cdot sk$$

$$\sigma = (R, S)$$

**Verification:**

$$[S] \cdot \mathcal{B} \stackrel{?}{=} R + [H(R \| pk \| M)] \cdot pk$$

**Re-randomization:**

For randomizer $\alpha$:

$$pk' = pk + [\alpha] \cdot \mathcal{B}$$

$$sk' = sk + \alpha$$

This enables **spend authorization signatures** that cannot be linked to the original key.

---

## 9. Transaction Structure and Validation

### 9.1 Transaction Versions

| Version | Introduced | Features |
|---------|------------|----------|
| 1 | Bitcoin | Transparent only |
| 2 | Zcash launch | + JoinSplit (Sprout) |
| 3 | Overwinter | + expiry height, version group |
| 4 | Sapling | + Spend/Output descriptions |
| 5 | NU5 | + Action descriptions, nonmalleable txid |

### 9.2 Version 5 Transaction Structure

```
Transaction v5:
├── header (4 bytes)
│   ├── version (4 bits) = 5
│   └── overwintered flag (1 bit) = 1
├── nVersionGroupId (4 bytes)
├── nConsensusBranchId (4 bytes)
├── nLockTime (4 bytes)
├── nExpiryHeight (4 bytes)
├── Transparent Bundle
│   ├── tx_in_count (compactSize)
│   ├── tx_in[] 
│   ├── tx_out_count (compactSize)
│   └── tx_out[]
├── Sapling Bundle
│   ├── nSpendsSapling (compactSize)
│   ├── vSpendsSapling[]
│   ├── nOutputsSapling (compactSize)
│   ├── vOutputsSapling[]
│   ├── valueBalanceSapling (int64)
│   ├── anchorSapling (32 bytes)
│   ├── vSpendProofsSapling[]
│   ├── vSpendAuthSigsSapling[]
│   ├── vOutputProofsSapling[]
│   └── bindingSigSapling (64 bytes)
└── Orchard Bundle
    ├── nActionsOrchard (compactSize)
    ├── vActionsOrchard[]
    ├── flagsOrchard (1 byte)
    ├── valueBalanceOrchard (int64)
    ├── anchorOrchard (32 bytes)
    ├── sizeProofsOrchard (compactSize)
    ├── proofsOrchard[]
    └── bindingSigOrchard (64 bytes)
```

### 9.3 Consensus Rules

#### General Rules

1. **Encoding validity**: All fields must be valid encodings
2. **No overflow**: Sum of inputs cannot exceed MAX_MONEY
3. **Positive value balance**: Transparent pool cannot go negative
4. **Expiry**: Transaction must be mined before nExpiryHeight

#### Shielded Rules

1. **Anchor validity**: Must reference a previous block's treestate
2. **Nullifier uniqueness**: No nullifier already in the set
3. **Proof validity**: All zk-SNARK proofs must verify
4. **Signature validity**: All spend auth and binding signatures must verify
5. **Value balance**: Commitments must balance with transparent change

### 9.4 SIGHASH Algorithm

Transaction authorization requires binding signatures to specific transactions. The SIGHASH algorithm creates a digest covering:

**Version 5 (NU5+):**

Using BLAKE2b-256 with personalization (per ZIP 244):

```
SIGHASH = BLAKE2b-256("ZcashTxHash_V5", 
    header_digest ||
    transparent_digest ||
    sapling_digest ||
    orchard_digest
)
```

Each sub-digest covers specific transaction components, providing flexibility for partial signing while preventing malleability.

---

## 10. Security Analysis

### 10.1 Cryptographic Assumptions

Zcash security relies on:

| Assumption | Used For |
|------------|----------|
| Discrete Log (DL) | Pedersen commitments, signatures |
| Collision Resistance | Hash functions, Merkle trees |
| PRF Security | Key derivation, nullifiers |
| Knowledge of Exponent | zk-SNARKs (BCTV14, Groth16) |
| Algebraic Group Model | Halo 2 soundness |

### 10.2 Historical Vulnerabilities

#### Faerie Gold Attack (Fixed pre-launch)

**Vulnerability**: In original Zerocash, the uniqueness of nullifiers wasn't enforced correctly, allowing potential creation of notes that multiple parties could spend.

**Fix**: Modified nullifier computation to include the spending key:

$$nf = PRF_{a_{sk}}^{nf}(\rho)$$

This ensures only the legitimate recipient can compute the valid nullifier.

#### InternalH Collision Attack (Fixed pre-launch)

**Vulnerability**: Potential hash collisions in internal circuit operations could allow proof forgery.

**Fix**: Added domain separation and uniqueness constraints in the circuit.

#### Value Overflow (Fixed 2018)

**Vulnerability**: CVE-2018-17144 (inherited from Bitcoin) allowed inflation through duplicate transaction processing.

**Fix**: Enhanced duplicate detection in transaction validation.

### 10.3 Trusted Setup Considerations

**BCTV14/Groth16 Requirement:**

The proving/verifying keys contain:

$$pk = (g^{\alpha}, g^{\beta}, \ldots, g^{\tau^d})$$

Where $\tau$ (the "toxic waste") must be destroyed. If any party knows $\tau$, they can forge proofs and create counterfeit ZEC.

**Zcash Ceremonies:**

1. **Sprout** (2016): 6 participants
2. **Powers of Tau** (2017-2018): 87 participants
3. **Sapling MPC** (2018): 100+ participants

Security requires that at least one participant honestly destroyed their contribution.

**Halo 2 Elimination:**

Orchard's Halo 2 requires no trusted setup—the "setup" is just a hash of a random string, publicly verifiable.

### 10.4 Privacy Limitations

#### Timing Analysis

Transaction timing patterns can leak information:

- Regular payment schedules → behavioral fingerprinting
- Immediate spend after receipt → linking in/out transactions

#### Amount Correlation

When moving between transparent and shielded:

- Unique amounts are linkable
- Round numbers may indicate user behavior

#### Graph Analysis

Transaction graph heuristics can narrow anonymity sets:

- One-input-one-output transactions
- Change output patterns
- Pool transitions

#### Metadata Leakage

Non-transaction data may deanonymize:

- IP addresses during broadcast
- Timing of wallet connections
- Exchange deposit/withdrawal records

### 10.5 Quantum Considerations

Current Zcash is **not quantum-resistant**:

| Component | Quantum Attack | Impact |
|-----------|---------------|--------|
| ECDSA (transparent) | Shor's algorithm | Funds theft |
| Pedersen commitments | Shor's algorithm | Commitment opening |
| zk-SNARKs | Varies | Proof forgery |
| Hash functions | Grover's algorithm | Reduced security |

The Zcash community is researching post-quantum alternatives, including lattice-based commitments and hash-based signatures.

---

## 11. Network Upgrades

### 11.1 Upgrade History

| Upgrade | Height | Date | Key Changes |
|---------|--------|------|-------------|
| **Sprout** | 0 | Oct 2016 | Initial launch |
| **Overwinter** | 347,500 | Jun 2018 | Transaction versioning, replay protection |
| **Sapling** | 419,200 | Oct 2018 | New shielded protocol, Groth16 |
| **Blossom** | 653,600 | Dec 2019 | 75s block time |
| **Heartwood** | 903,000 | Jul 2020 | Shielded coinbase, ZIP-221 |
| **Canopy** | 1,046,400 | Nov 2020 | Dev fund, deprecate Sprout |
| **NU5** | 1,687,104 | May 2022 | Orchard, Halo 2, unified addresses |
| **NU6** | 2,726,400 | Nov 2024 | Lockbox (ZIP 2001), second halving, new funding model |
| **NU6.1** | ~2,820,000 | Nov 2025 | Lockbox disbursement fixes, funding stream adjustments |

NU6 marked a significant milestone, coinciding with the second Zcash halving (block reward reduced to 1.5625 ZEC) and the expiration of the original Dev Fund. The Lockbox mechanism (ZIP 2001) now accumulates 20% of block rewards for future decentralized grant distribution.

### 11.2 Upgrade Mechanism

Zcash uses **coordinated network upgrades**:

1. Specification published as ZIPs (Zcash Improvement Proposals)
2. Implementation in reference client (zcashd/zebra)
3. Activation at predetermined block height
4. Old transaction formats remain valid (backward compatibility)

### 11.3 Future Directions

The Zcash ecosystem continues active development across multiple organizations. Key initiatives for 2025 and beyond include:

#### Crosslink (Hybrid Consensus)

The most significant architectural change under development is **Crosslink**, led by Shielded Labs. This proposed upgrade introduces a **finality layer atop Proof-of-Work**:

- **Mechanism**: Validators stake ZEC to participate in block finalization
- **Security**: Mitigates 51% attacks by requiring both PoW and stake-weighted consensus
- **Finality**: Enables faster "safe" transaction acceptance without waiting for deep confirmations
- **Timeline**: Active development; testnet deployment expected in 2026

Crosslink represents Zcash's path toward hybrid PoW/PoS, addressing long-standing concerns about mining centralization and network security.

#### Zcash Shielded Assets (ZSA) — Candidate ZIPs

ZSA would enable **user-defined tokens** within shielded pools, extending Zcash's privacy guarantees to arbitrary assets. Key proposals include:

- **ZIP 226/227**: Asset issuance and transfer mechanics
- **Status**: Specification complete; not yet activated on Mainnet
- **Use cases**: Stablecoins, NFTs, wrapped assets—all with Zcash-grade privacy

#### Post-Quantum Migration

Current Zcash cryptography (ECDSA, Pedersen commitments, zk-SNARKs) is vulnerable to quantum attacks. Research areas include:

- **Lattice-based commitments**: Replacing Pedersen with quantum-resistant alternatives
- **Hash-based signatures**: SPHINCS+ or similar for spending authorization
- **Timeline**: Long-term research; no immediate threat from current quantum computers

#### Recursive Proof Composition

Halo 2's architecture enables proofs that verify other proofs, opening possibilities for:

- **Transaction aggregation**: Batching many transactions into single proofs
- **Light client efficiency**: Compact proofs of chain validity
- **Cross-chain bridges**: Trustless verification of Zcash state on other chains

---

## 12. Conclusion

### 12.1 Summary

Zcash represents the state of the art in blockchain privacy, implementing zero-knowledge proofs at scale to provide:

- **Unconditional anonymity**: Transaction details hidden by cryptographic proofs
- **Selective disclosure**: Viewing keys enable controlled transparency
- **Strong fungibility**: All shielded ZEC are cryptographically identical
- **Decentralized trust**: No trusted parties required for transaction validation

The evolution from Sprout to Sapling to Orchard demonstrates continuous improvement in efficiency, security, and usability—culminating in Halo 2's elimination of trusted setup requirements. With NU6's activation in late 2024 and ongoing NU6.1 refinements, the protocol continues to mature.

### 12.2 Privacy in Context

Zcash exists within a broader ecosystem:

- Complements transparent cryptocurrencies for privacy-sensitive use cases
- Enables legitimate financial privacy (competitive confidentiality, personal security)
- Provides a research platform for zero-knowledge cryptography
- Demonstrates that privacy and auditability can coexist (viewing keys)

The multi-organization structure (ECC, Zcash Foundation, Shielded Labs) ensures resilience and diverse perspectives on protocol evolution.

### 12.3 Looking Forward

The Zcash protocol stands at an inflection point. Key developments to watch:

- **Crosslink**: The proposed hybrid PoW/PoS system addresses 51% attack concerns and could fundamentally change Zcash's consensus model
- **ZSA (Zcash Shielded Assets)**: User-defined tokens with full privacy would expand Zcash's utility beyond simple value transfer
- **Continued decentralization**: The Lockbox mechanism and future grant distribution aim to reduce reliance on any single organization
- **Post-quantum preparedness**: Long-term research ensures Zcash remains secure against emerging threats

As privacy becomes increasingly valuable in digital economies, Zcash's cryptographic foundations provide a blueprint for financial systems that respect user sovereignty without sacrificing security guarantees.

---

## References

1. Ben-Sasson, E., Chiesa, A., Garman, C., Green, M., Miers, I., Tromer, E., & Virza, M. (2014). *Zerocash: Decentralized Anonymous Payments from Bitcoin*. IEEE Symposium on Security and Privacy.

2. Hopwood, D., Bowe, S., Hornby, T., & Wilcox, N. (2025). *Zcash Protocol Specification*. Version 2025.6.1 [NU6.1].

3. Groth, J. (2016). *On the Size of Pairing-Based Non-interactive Arguments*. EUROCRYPT 2016.

4. Bowe, S., Grigg, J., & Hopwood, D. (2019). *Recursive Proof Composition without a Trusted Setup*.

5. Electric Coin Company. *Zcash Improvement Proposals (ZIPs)*. https://zips.z.cash

6. Nakamoto, S. (2008). *Bitcoin: A Peer-to-Peer Electronic Cash System*.

---

## Appendix A: Mathematical Notation Reference

| Symbol | Meaning |
|--------|---------|
| $\mathbb{B}$ | Bit values $\lbrace 0, 1 \rbrace$ |
| $\mathbb{B}^n$ | Bit sequences of length $n$ |
| $\mathbb{F}_p$ | Finite field with $p$ elements |
| $\mathbb{G}$ | Elliptic curve group |
| $[k] \cdot P$ | Scalar multiplication: $P + P + \ldots + P$ ($k$ times) |
| $e(P, Q)$ | Pairing function |
| $\mathcal{O}$ | Point at infinity (group identity) |
| $r$ | Subgroup order |
| $h$ | Cofactor |
| $\oplus$ | XOR operation |
| $\|$ | Concatenation |
| $\leftarrow$ | Random sampling |
| $:=$ | Definition |

## Appendix B: Glossary

**Action**: Orchard's combined spend/output operation

**Anchor**: Merkle root identifying a treestate

**Binding Signature**: Proves transaction value balance

**Chain Value Pool**: Total value in a transaction type

**Commitment**: Cryptographic hiding of note contents

**Diversifier**: Randomness enabling multiple addresses per key

**Full Viewing Key**: Enables viewing incoming and outgoing transactions

**JoinSplit**: Sprout's atomic spend/create operation

**Note**: Shielded representation of value

**Nullifier**: Unique identifier revealed when spending

**Proving Key**: Secret parameters for proof generation

**Shielded Pool**: Aggregated private value in a protocol

**Spend Authority**: Ability to transfer value

**Treestate**: State of commitment tree and nullifier set

**Verifying Key**: Public parameters for proof verification

**Viewing Key**: Key enabling transaction visibility without spend authority

**zk-SNARK**: Zero-Knowledge Succinct Non-interactive Argument of Knowledge

---

*This analysis was prepared based on the Zcash Protocol Specification Version 2025.6.1 [NU6.1]. For the authoritative protocol definition, consult the official specification maintained at [zips.z.cash](https://zips.z.cash). For implementation details, refer to the reference clients: zcashd (ECC), Zebra (Zcash Foundation), and Zashi wallet (ECC).*
