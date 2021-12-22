# About intersection cuboids

per dimension...

* p below  q -> pFrom               .. min(pTo, qFrom - 1) if valid
* p inside q -> max(pFrom, qFrom)   .. min(pTo, qTo)       if valid
* p above  q -> max(pFrom, qTo + 1) .. pTo                 if valid

1. Split each dim in to [below, inside, above]
2. Generate candidate cuboids for all 27 combinations
3. For each of these, if its valid, add it to aOnly, bOnly or both by testing



