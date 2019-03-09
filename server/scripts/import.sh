# Import database

# PWD at root of project
# Run ./scripts/import.sh directory_name

if [ $# == 0 ]
then
  echo 'Error: Wrong statment syntax'
  echo 'Please import from db/[directory_name]'
  echo './script/import.sh [directory_name]'
  exit
fi

echo '\n\nImport database from db/'$1 '...\n\n'

mongoimport --db scrum-practice --collection users --file ./db/$1/users.json
mongoimport --db scrum-practice --collection projects --file ./db/$1/projects.json

echo '\n\nImport successfully\n\n'