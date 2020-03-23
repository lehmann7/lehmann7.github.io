#include <mymath/factorial.h>

using namespace mymath;

int factorial(
	int n
)
{
	int m = 1;
	for (int i = 2; i < n; ++i)
	{
		m *= i;
	}
	return m;
}
