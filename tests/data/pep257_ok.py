def kos_root():
    """Return the pathname of the KOS root directory."""
    global _kos_root
    if _kos_root:
      return _kos_root
