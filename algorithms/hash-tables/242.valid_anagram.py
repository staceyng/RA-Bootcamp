class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # put both strings into a hashmap, check if both hashmaps are the same
        s_map = self._into_hash_map(s)
        t_map = self._into_hash_map(t)

        return t_map == s_map

    def _into_hash_map(self, s: str):
        d = dict()
        for c in s:
            d[c] = 1 if c not in d else d[c] + 1

        return d


if __name__ == "__main__":
    s1 = "anagram"
    s2 = "nagaram"
    s = Solution().isAnagram(s1, s2)
    print(s)
