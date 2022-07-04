from typing import List


class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        # time complexity = O(n*m)
        # space complexity = O(n)
        max_wealths = []
        for i in accounts:
            max_wealths.append(sum(i))

        return max(max_wealths)


if __name__ == "__main__":
    # acc = [[1,2,3],[3,2,1]]
    # acc = [[1,5],[7,3],[3,5]]
    acc = [[2, 8, 7], [7, 1, 3], [1, 9, 5]]
    s = Solution().maximumWealth(acc)
    print(s)
