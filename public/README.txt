Place la photo de Yannick ici sous le nom exact : broker-photo.jpg

  consolidation-yannickcharette/public/broker-photo.jpg

Le composant BrokerCard l'affiche en avatar rond (rognage centré sur le visage).
Si le fichier est absent, la carte affiche automatiquement le monogramme « YC » en vert.

Conseil : une image carrée (ex. 400x400) donne le meilleur rendu en cercle.
Le PNG fonctionne aussi — renomme-le broker-photo.jpg ou change PHOTO_SRC dans
src/components/ui/BrokerCard.tsx vers "/broker-photo.png".

Pense aussi à ajouter le logo de l'agence de Yannick (public/logo.png) et à
rebrancher la balise <img> dans src/app/page.tsx (actuellement un logo texte
en attendant le vrai fichier).
