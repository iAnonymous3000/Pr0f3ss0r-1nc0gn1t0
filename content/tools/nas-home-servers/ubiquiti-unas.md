---
title: "Ubiquiti UniFi UNAS"
description: "Local NAS appliances running proprietary UniFi Drive. Remote management defaults on during setup; encryption and independent backups need configuration."
date: 2026-10-04T00:00:00-07:00
draft: false
weight: 20
image: "/images/tools/unifi-protect-logo.svg"
linkToTool: "https://ui.com/us/en/integrations/network-storage"
statusLabels:
  - "Proprietary UniFi Drive"
  - "Remote management on by default"
---

**UniFi UNAS** is Ubiquiti's family of network storage appliances for shared files, computer backups, snapshots, and backup copies to other storage. Current examples include the desktop [UNAS 2](https://techspecs.ui.com/unifi/integrations/unas-2) and [UNAS 4](https://techspecs.ui.com/unifi/integrations/unas-4), and rack-mounted [UNAS Pro](https://techspecs.ui.com/unifi/integrations/unas-pro). Choose a model and disks for your capacity and redundancy needs. This entry covers storage capabilities; it does not establish support for hosting arbitrary applications, containers, or virtual machines.

## Local access and vendor accounts

[Local file access](https://help.ui.com/hc/en-us/articles/39670142044567-Accessing-UniFi-NAS-UNAS-Drives) works through SMB or NFS on your network, or the web interface at the NAS's IP address. SMB uses separately configured [File Service credentials](https://help.ui.com/hc/en-us/articles/14276882157975-UniFi-Drive-Add-UniFi-Drive-to-Your-Desktop-via-SMB).

Ubiquiti distinguishes [local-only UniFi administrator credentials from UI Accounts](https://help.ui.com/hc/en-us/articles/14275946860311-UniFi-Password-Recovery-and-Ownership-Transfer). A UI Account is used for Site Manager remote access. Its [remote-management guide](https://help.ui.com/hc/en-us/articles/115012240067-Enabling-UniFi-Remote-Management) says remote management is enabled by default during setup. Review and disable it in the console settings if you want local administration only; opening the local interface does not disable remote access.

We have not verified account-free first-time UNAS setup, a fully offline update process for these models, or their outbound traffic after optional services are disabled. Local file access alone does not establish those properties.

## Encryption, snapshots, and backups

Configure encryption for the data you need protected. Ubiquiti's [storage-pool documentation](https://help.ui.com/hc/en-us/articles/32705970278551-Understanding-UniFi-Drive-Storage-Pools-and-RAID-Groups) describes a separate encryption key for each pool. Losing the key permanently loses access to that pool's encrypted data. Keep a secure recovery copy away from the NAS. Restoring a configuration from before a pool was added can leave the newer pool inaccessible; retain current configuration backups after storage changes.

[Snapshots](https://help.ui.com/hc/en-us/articles/33317752912919-Understanding-System-Data-Others-in-UniFi-Drive) must be enabled and consume space on the NAS. RAID and snapshots do not replace an independent backup. Configure [backup tasks](https://help.ui.com/hc/en-us/articles/30961935781655-Troubleshooting-UNAS-Backup-Issues) to another UNAS, an SMB server, or supported cloud storage, and test recovery. File backups and configuration backups serve different purposes. Do not assume NAS encryption also protects every exported file or backup destination. Ubiquiti documents a 143-character file-path limit for off-site backups to an encrypted UNAS destination.

## Updates and related UniFi hardware

Configure the Official update channel and a schedule. Ubiquiti's [update guide](https://help.ui.com/hc/en-us/articles/7605005245975-UniFi-Updates) documents local update management with remote access disabled. We have not established model-specific security support end dates; current releases and a hardware warranty do not guarantee a future update period.

For related networking and camera equipment, see [UniFi Dream Router 7]({{< relref "/tools/routers/unifi-dream-router-7" >}}) and the [UniFi Protect Camera System]({{< relref "/tools/home-security-cameras/unifi-protect-camera-system" >}}).
