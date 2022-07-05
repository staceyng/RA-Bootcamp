from typing import List


class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        # 2 separate arrays - 1 even, 1 odd, join them tgt at the end
        # time complexity = O(n)
        # space complexity = O(n/2)? O(n)
        even = []
        odd = []
        for i in nums:
            if i % 2 == 0:
                even.append(i)
            else:
                odd.append(i)

        return even + odd


if __name__ == "__main__":
    n = [3, 1, 2, 4]
    s = Solution().sortArrayByParity(n)
    print(s)
