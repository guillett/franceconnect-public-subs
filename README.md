

Pour lancer le fournisseur de service de démonstration

```
git clone https://github.com/france-connect/service-provider-example
cd service-provider-example
npm install
npm start
```

Pour générer la liste des sub

```
npm ci

curl https://raw.githubusercontent.com/france-connect/identity-provider-example/master/database.csv --output tests/database.csv

npx playwright test

for i in results/sub_*; do echo -n $i | sed  's/.*_//'; echo -n , ; cat $i; echo; done | sort -n > mapping.csv
echo -e "id,sub\n$(cat mapping.csv)" > mapping.csv
cat mapping.csv
```

