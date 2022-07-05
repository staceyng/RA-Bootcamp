from typing import List


class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        # use n spacer to find corresponding y for x
        # time complexity = O(n)
        # space complexity = O(n)
        res = []
        for i in range(n):
            res.append(nums[i])
            res.append(nums[i + n])

        return res


if __name__ == "__main__":
    n = 4
    nums = [1, 2, 3, 4, 4, 3, 2, 1]
    # n = 3
    # nums = [2, 5, 1, 3, 4, 7]
    s = Solution().shuffle(nums, n)
    print(s)
