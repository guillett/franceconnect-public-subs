

```
npm ci

curl https://raw.githubusercontent.com/france-connect/identity-provider-example/master/database.csv --output tests/database.csv

npx playwright test


for i in results/sub_*; do echo -n $i | sed  's/.*_//'; echo -n , ; cat $i; echo; done | sort -n > mapping.csv
echo -e "id,sub\n$(cat mapping.csv)" > mapping.csv
```

