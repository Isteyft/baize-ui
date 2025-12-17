for i in components core docs hooks theme utils; do
  mkdir $i
  cd $i
  npm init -y
  cd ../
done