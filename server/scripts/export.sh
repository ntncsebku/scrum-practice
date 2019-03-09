# Export database

# PWD at root of project
# Run ./scripts/export.sh directory_name

if [ $# == 0 ]
then
  echo 'Error: Wrong statment syntax'
  echo 'Please export to db/[directory_name]'
  echo './script/export.sh [directory_name]'
  exit
fi

echo '\n\nExport database to db/'$1 '...\n\n'

mongoexport --db scrum-practice --collection users --out ./db/$1/users.json
mongoexport --db scrum-practice --collection projects --out ./db/$1/projects.json

echo '\n\nExport successfully\n\n'