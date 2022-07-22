int main() {
#if _WIN32
(*0) = 1;
#else
(*0) = 2;
#endif

#ifdef __unix__
(*0) = 3;
#else
(*0) = 4;
#endif

#ifdef _MSC_VER
(*0) = 5;
#else
(*0) = 6;
#endif
}
