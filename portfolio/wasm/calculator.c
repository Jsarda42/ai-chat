#include <emscripten/emscripten.h>

EMSCRIPTEN_KEEPALIVE
double add(double a, double b) {
  return a + b;
}

EMSCRIPTEN_KEEPALIVE
double subtract(double a, double b) {
  return a - b;
}

EMSCRIPTEN_KEEPALIVE
double multiply(double a, double b) {
  return a * b;
}

EMSCRIPTEN_KEEPALIVE
double divide(double a, double b) {
  if (b == 0) return 0;
  return a / b;
}


