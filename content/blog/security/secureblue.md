---
title: "secureblue: Redefining Security in Linux Desktop Operating Systems"
description: "An in-depth look at secureblue, a security-hardened Linux distribution built on Fedora Atomic that aims to be the most secure desktop Linux OS while maintaining usability."
tags:
  - "secureblue"
  - "fedora"
  - "linux-security"
  - "selinux"
  - "hardening"
  - "atomic-os"
  - "bluebuild"
  - "chromium"
  - "security-hardening"
  - "mandatory-access-control"
  - "immutable-os"
  - "desktop-linux"
  - "hardened-malloc"
  - "system-security"
  - "containerization"
  - "browser-security"
  - "kernel-hardening"
  - "security-engineering"
  - "operating-system-security"
  - "open-source-security"
---

In today's online landscape, security is paramount. With cyber threats becoming increasingly sophisticated, users need an operating system that not only provides robust security features but also maintains usability. **secureblue** emerges as a promising solution, aiming to redefine the standards of security in Linux desktop environments.

## What is secureblue?

**secureblue** is a project that builds upon Fedora Atomic's base images to create **hardened operating system images**. Utilizing **BlueBuild**, it generates OS images with enhanced security measures designed to protect against both known and unknown vulnerabilities. secureblue's goal is to increase defenses without sacrificing usability for most use cases.

It's important to note that secureblue's mission is focused: **to be the most secure desktop Linux OS**. It does not claim to be the most secure desktop OS overall, as other systems like macOS have significant security advantages such as full verified boot. secureblue is designed for users whose first priority is using desktop Linux, with security as a second priority.

The project was founded and is being developed by [RoyalOughtness](https://github.com/RoyalOughtness).



## Why is secureblue Based on Fedora?

secureblue chooses **Fedora** as its base for two primary reasons:

1. **SELinux Integration**: Fedora ships with **SELinux (Security-Enhanced Linux)** in enforcing mode for system processes out of the box. SELinux provides a robust Mandatory Access Control (MAC) system that significantly enhances system security.

2. **Atomic Image Building**: Fedora provides a robust ecosystem for **atomic image building**, which is essential for creating immutable operating system images that are easier to maintain and secure.

While other distributions like NixOS were considered, they were ultimately not chosen due to SELinux compatibility issues stemming from their filesystem layout management.



## SELinux vs. AppArmor

Both SELinux and AppArmor are Linux kernel security modules that provide Mandatory Access Control (MAC), but they differ in significant ways:

| **Feature**                 | **SELinux**                                              | **AppArmor**                                          |
|-----------------------------|----------------------------------------------------------|-------------------------------------------------------|
| **Control Granularity**     | Fine-grained control over nearly every system aspect     | Profile-based restrictions with less granular control |
| **Configuration Complexity**| More complex, steeper learning curve                     | Simpler to configure and manage                       |
| **Policy Model**            | Type enforcement, roles, users                           | Path-based access control                             |
| **Default Implementation**  | Fedora, RHEL, CentOS                                     | Ubuntu, SUSE                                          |
| **Resource Requirements**   | Higher overhead                                          | Lower overhead                                        |
| **Security Depth**          | More comprehensive security model                        | More straightforward but less detailed                |

**Why SELinux?** secureblue opts for SELinux because of its comprehensive security capabilities. The granular control allows secureblue to enforce strict security policies, making it harder for malicious applications to cause harm.



## Key Features of secureblue

secureblue introduces several enhancements to bolster system security:

### 1. Global Implementation of hardened_malloc

Replaces the default memory allocator with **[hardened_malloc](https://github.com/GrapheneOS/hardened_malloc)**, which includes security enhancements to protect against various memory corruption vulnerabilities—even within Flatpak applications.

### 2. Hardened Chromium Browser (`hardened-chromium`)

A security-enhanced version of Chromium, focusing on fortifying defenses against web-based attacks. Developed by the secureblue team, `hardened-chromium` provides:

- **Improved Sandboxing**: Strengthens the isolation between browser processes.
- **Security Patches**: Incorporates the latest security fixes promptly.
- **Strict Defaults**: Configured with settings that prioritize security.

For more details, visit the [`hardened-chromium` repository](https://github.com/secureblue/hardened-chromium).

### 3. Strict Sysctl Settings

Adjusts numerous kernel parameters to enhance system security, such as:

- Limiting core dumps.
- Restricting access to kernel logs.
- Enhancing network security settings.

### 4. Removal of SUID Binaries

By removing the **SUID bit** from several binaries and replacing their functionality with capabilities, secureblue reduces the risk of **privilege escalation attacks**.

### 5. Blacklisting Unused Kernel Modules

Minimizes the attack surface by **preventing potential exploits** that target seldom-used components. This is achieved by blacklisting unnecessary kernel modules.

### 6. Additional Security Enhancements

- **Disabling Unnecessary Services**: Services like `cups`, `geoclue`, and others are disabled by default.
- **Secure DNS Configurations**: Implements opportunistic DNSSEC and DNS-over-TLS with `systemd-resolved`.
- **User Account Protection**: Implements brute-force protection and enforces strong password policies.
- **Container and Flatpak Security**: Adjusts policies for safer application management.


## Why is Chromium Chosen Over Firefox?

The choice of Chromium over Firefox is based on significant technical security advantages:

1. **Site Isolation**

   - **Chromium**: Has had complete **site isolation** implementation for years, meaning each site runs in its own process, reducing the risk of cross-site attacks.
   - **Firefox**: Still lacks complete site isolation, making it more vulnerable to certain types of exploits.

2. **Sandbox Strength**

   - **Chromium**: Offers a robust sandboxing mechanism that isolates processes effectively.
   - **Firefox**: Sandbox implementation is comparatively weaker, potentially allowing malicious code to affect the system.

3. **Base Security**

   - Even without hardening, Chromium provides better security than Firefox due to its architecture and security model.

4. **Hardening Potential**

   - Chromium's architecture allows for additional security enhancements through hardening, which the secureblue team leverages in `hardened-chromium`.

**Note on Privacy vs. Security**: When security and privacy considerations conflict, secureblue prioritizes **security**. Certain privacy-focused browsers like Brave or ungoogled-chromium may reduce security (e.g., enabling Manifest V2 extensions), and thus are not chosen as the base.



## Comparison with Other Secure Systems

It's important to understand that secureblue serves different goals than other security-focused systems:

- **Qubes OS**: Focuses on virtualization-based sandboxing using a hypervisor. While highly secure, it's a different approach compared to secureblue's focus on hardening the Linux desktop environment.

- **macOS**: Provides certain security advantages like **full verified boot** that aren't currently possible with desktop Linux. secureblue acknowledges these limitations but aims to be the most secure option within the Linux ecosystem.



## Getting Started with secureblue

For installation instructions and documentation, visit the **[secureblue GitHub repository](https://github.com/secureblue/secureblue/)**. The installation process and requirements are maintained in the repository to ensure you always have access to the most current information.



## Shoutout to BlueBuild

secureblue utilizes **[BlueBuild](https://blue-build.org/)**, an innovative tool for building immutable, versioned, and containerized operating system images. BlueBuild plays a crucial role in enabling secureblue to deliver robust and secure OS images efficiently.



## Contributing and Community

secureblue welcomes contributions and community involvement:

- **Contributing**: Review the [Contributing Documentation](https://github.com/secureblue/secureblue/blob/live/docs/CONTRIBUTING.md) to understand how to contribute effectively.

- **Code of Conduct**: Adhere to the project's [Code of Conduct](https://github.com/secureblue/secureblue/blob/live/docs/CODE_OF_CONDUCT.md).

- **Community Support**: Join discussions on the **[secureblue Discord server](https://discord.gg/DxqDExrhXW)** to collaborate with other contributors and users.

- **Donations**: Consider supporting the project by donating. Details are available on the [Donate page](https://github.com/secureblue/secureblue/blob/live/docs/DONATE.md).



## Conclusion

secureblue represents a significant step forward in enhancing the security of Linux desktop operating systems. By building on Fedora's robust security features and adding its own layers of hardening, secureblue offers a compelling option for users who prioritize both Linux and security.

Whether you're an individual concerned about personal security or an organization seeking a more secure desktop environment, secureblue is worth exploring.

---

**Have you tried secureblue? Share your thoughts and experiences!**
