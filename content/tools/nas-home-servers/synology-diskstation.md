---
title: "Synology DiskStation"
description: "Local file, photo, and backup storage with proprietary DSM and optional cloud access."
date: 2026-10-04T00:00:00-07:00
draft: false
image: "/images/tools/synology-surveillance-station-logo.svg"
linkToTool: "https://www.synology.com/en-us/products"
weight: 10
recommendationLabel: "Local NAS storage"
statusLabels:
  - "Proprietary DSM"
  - "Optional cloud access"
---

Synology DiskStation is a family of network-attached storage devices running DiskStation Manager (DSM). It can keep shared files, photo libraries, and device backups on hardware you administer at home. The two-bay [DS225+](https://www.synology.com/en-us/products/DS225%2B?tab=specs) and four-bay [DS925+](https://www.synology.com/en-us/products/DS925%2B?tab=specs) are examples; packages, memory limits, expansion, and performance vary by model.

Local setup and accounts:

- [DSM user accounts and Synology Accounts are separate](https://kb.synology.com/en-me/DSM/tutorial/Differences_between_Synology_Account_and_DSM_user_account). Local DSM credentials control access to the NAS. Online services such as QuickConnect, Synology DDNS, and C2 introduce a Synology Account requirement.
- Synology documents [manual installation without an Internet connection](https://kb.synology.com/DSM/tutorial/How_to_install_DSM), using Synology Assistant and a previously downloaded DSM installation file. The exact first-run wizard on DS225+/DS925+ has not been independently tested here. Package downloads, activation, and online services have separate requirements.
- DSM is proprietary software. Local storage still needs firmware and package maintenance; it does not imply zero vendor communication.

Remote access and data collection:

- QuickConnect and Synology DDNS are optional. If enabled, Synology [collects the device serial number, IP address, and routing ports](https://www.synology.com/en-us/company/legal/Services_Data_Collection_Disclosure) to provide these services.
- [QuickConnect's documented paths](https://global.download.synology.com/download/Document/Software/WhitePaper/Os/DSM/All/enu/Synology_QuickConnect_White_Paper_enu.pdf) include direct connections and a Synology relay fallback. The browser Portal Server proxy path terminates TLS at Synology; this caveat does not apply to every QuickConnect connection. For remote administration, use your own VPN and avoid exposing DSM directly to the Internet.
- Device analytics is opt-in, with retention of up to three years under the [current disclosure](https://www.synology.com/en-us/company/legal/Services_Data_Collection_Disclosure). Cloud configuration backup and Active Insight are separate services to review before enabling. These are vendor disclosures, not an independent network audit.

Encryption and recovery:

- Volume encryption must be configured when creating a volume and requires DSM 7.2 or later on [supported models](https://kb.synology.com/en-me/DSM/tutorial/Which_models_support_encrypted_volumes), including DS225+ and DS925+. It is not a family-wide feature. With the local key vault, volumes automatically unlock at boot when their keys are available. Synology's [protection limits](https://kb.synology.com/en-global/WP/Synology_Volume_Encryption_White_Paper/4) exclude theft of the entire NAS with that local vault. An external KMIP vault on another Synology NAS separates the keys; volumes remain locked at startup if the vault is unavailable. Keep recovery keys separately.
- Shared-folder encryption is a separate configuration. [Key Manager](https://kb.synology.com/en-global/DSM/help/DSM/AdminCenter/file_share_key_manager?version=7) can store keys on the NAS or an external device and can automatically mount folders using a machine key. For folders that must stay locked after a restart, disable automatic mounting and keep their unlocking keys off the NAS. Mounted folders and unlocked volumes remain readable by the running system.
- [Hyper Backup client-side encryption](https://www.synology.com/en-global/dsm/7.4/software_spec/hyper_backup) is separately configured for backup tasks; encrypting the source NAS does not automatically encrypt every backup destination. DSM's [restore instructions](https://kb.synology.com/DSM/tutorial/How_to_restore_settings_apps_files_permissions_by_Hyper_Backup) accept the encryption password or exported encryption key. Preserve both securely, apart from the backup, and test recovery.
- Keep an off-device backup, with an off-site copy where practical. RAID and snapshots stored on the same NAS cannot replace that backup.

Hardware and maintenance tradeoffs:

- Check the exact model's drive and package support before buying. Under [DSM 7.3 compatibility rules](https://kb.synology.com/DSM/tutorial/Drive_compatibility_policies), 2025+ DiskStation Plus models can create pools with unlisted HDDs and 2.5-inch SATA SSDs; explicitly incompatible drives remain excluded. New M.2 NVMe pools and caches still require compatible listed drives on models supporting those features.
- Check both the [model support status](https://www.synology.com/en-us/products/status) and [DSM version lifecycle](https://kb.synology.com/en-me/WP/Software_Life_Cycle_Policy/2). A DSM version's maintenance date is not a guaranteed support term for every DiskStation model.
- Synology [automatically installs important DSM and package updates](https://kb.synology.com/en-global/DSM/tutorial/stop_system_package_auto_update) on 2025+ models newly installed with DSM 7.2.2-72806 Update 3 or later and connected to the Internet. Its documented manual-update override requires root SSH access and must be reapplied after Mode 2/System Reset and DSM reinstallation. Keep security updates enabled.

For camera recording and its licensing considerations, see [Synology Surveillance Station]({{< relref "/tools/home-security-cameras/synology-surveillance-station-camera-system" >}}).
