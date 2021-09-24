#include <iostream>
using namespace std;

string t;
int main() {
    while (cin >> t) {
        cout << t[0] - 'a' + 1 << '\n';
    }
}