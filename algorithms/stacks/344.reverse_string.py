from typing import List


class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        # use 2 pointers
        lp = 0
        rp = len(s) - 1
        while lp <= rp:
            # swap positions
            s[lp], s[rp] = s[rp], s[lp]
            # update lp and rp
            lp += 1
            rp -= 1

        return s


if __name__ == "__main__":
    string = ["h", "e", "l", "l", "o"]
    s = Solution().reverseString(string)
    print(s)
