def kos_root():
    """Form a complex number.
    Keyword arguments:
    real -- the real part (default 0.0)
    imag -- the imaginary part (default 0.0)
    """
    global _kos_root
    if _kos_root:
      return _kos_root
