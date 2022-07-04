from typing import List


class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        # time complexity = O(n)
        # space complexity = O(n)
        num_sum = [nums[0]]
        for i in range(1, len(nums)):
            add = num_sum[i - 1] + nums[i]
            num_sum.append(add)

        return num_sum


if __name__ == "__main__":
    # n = [1, 2, 3, 4]
    # n = [1, 1, 1, 1, 1]
    n = [3, 1, 2, 10, 1]
    s = Solution().runningSum(n)
    print(s)
