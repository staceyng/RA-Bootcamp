from typing import List


class Solution:
    def validMountainArray(self, arr: List[int]) -> bool:
        # time complexity  = O(n)
        # space complexity = O(1)
        
        # use flags
        up = False
        down = False
        for i in range(1, len(arr)):
            if arr[i] > arr[i - 1] and down is False:
                up = True
            elif arr[i] < arr[i - 1] and up is True:
                down = True
            else:
                return False

        return up and down


if __name__ == "__main__":
    # arr = [2,1]
    # arr = [3, 5, 5]
    arr = [0, 3, 2, 1]
    s = Solution().validMountainArray(arr)
    print(s)
