from typing import List


class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # brute force - 2 loops to check if element exists in each array
        # time complexity = O(n**2)
        # space complexity = O(n)
        res = []

        for i in nums1:
            if i in nums2:
                res.append(i)
                nums2.remove(i)

        return res


if __name__ == "__main__":
    # n1 = [1, 2, 2, 1]
    # n2 = [2, 2]
    n1 = [4, 9, 5]
    n2 = [9, 4, 9, 8, 4]
    s = Solution().intersect(n1, n2)
    print(s)
