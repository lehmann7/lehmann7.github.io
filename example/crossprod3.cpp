#include <mymath/crossprod3.h>

using namespace mymath;

void crossprod3(
	const int* a,
	const int* b,
	int* c
)
{
	c[0] = a[1]*b[2] - a[2]*b[1];
	c[1] = a[2]*b[0] - a[0]*b[2];
	c[2] = a[0]*b[1] - a[1]*b[0];
}
