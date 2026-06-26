// ─── CONTENU QUOTIDIEN — 4 posts par jour ────────────────────────────────────
// Chaque entrée = { matin, midi, soir, nuit }
// Le bot tourne en boucle sur ce tableau (jour 1, 2, 3... puis reprend)

const DAILY_CONTENT = [

  // ── JOUR 1 ──────────────────────────────────────────────────────────────────
  {
    matin: `🇨🇩 *Bonjour depuis le Congo !*

🌍 *Fait du jour — La RDC en chiffres*

La République Démocratique du Congo est :
• Le *2ᵉ plus grand pays d'Afrique* (2,3 millions de km²)
• Le *4ᵉ plus peuplé du continent* avec 100M+ habitants
• Abritant *450+ groupes ethniques* différents
• Parlant *plus de 200 langues*

Un géant culturel au cœur de l'Afrique. 💚💛❤️

_Bonne journée ! Rendez-vous à midi pour la suite._ 👋`,

    midi: `🎵 *Midi Musical — La Rumba Congolaise*

En *2021*, l'UNESCO a inscrit la Rumba congolaise au *Patrimoine Culturel Immatériel de l'Humanité*.

Née à Kinshasa dans les années 1940, elle mélange :
🎸 La guitare africaine
🥁 Les rythmes afro-cubains
🎤 Le chant en Lingala

*Artistes légendaires :*
→ Franco Luambo — "Le Grand Maître" (150+ albums)
→ Tabu Ley Rochereau — "L'Oiseau rare"
→ Papa Wemba — Roi du Soukous

🎧 Cherchez *"Franco Luambo Mario"* sur YouTube ce soir !`,

    soir: `🍗 *Recette du soir — Poulet Moambe*

Le plat national non officiel de la RDC ! 🇨🇩

*Ingrédients :*
• 1 poulet coupé en morceaux
• 400g de beurre de palme (nyembwe)
• 2 oignons · 4 gousses d'ail · Piment
• Sel, poivre, laurier

*Préparation :*
1️⃣ Faire revenir poulet + oignons + ail
2️⃣ Ajouter le beurre de palme dilué dans de l'eau
3️⃣ Mijoter 45 min à feu doux avec le piment
4️⃣ Servir avec du riz ou du fufu 🫓

*Bon appétit !*
👉 En Lingala : _"Bolia malamu !"_ 😋`,

    nuit: `🌙 *Bonsoir — Proverbe Congolais*

📖 *Sagesse du soir en Lingala :*

_"Motema moko ekoki te kozipa nyonso."_

🇫🇷 *Traduction :*
_"Un seul cœur ne peut pas tout couvrir."_

💭 *Signification :*
On ne peut pas tout aimer ou tout maîtriser seul. La communauté, la famille et l'entraide sont au cœur de la culture congolaise.

C'est la philosophie *Ubuntu* : _"Je suis parce que nous sommes."_

Bonne nuit ! 🌟
_À demain pour de nouvelles découvertes. 🇨🇩_`
  },

  // ── JOUR 2 ──────────────────────────────────────────────────────────────────
  {
    matin: `🇨🇩 *Bonjour depuis le Congo !*

🌿 *Fait du jour — Le Fleuve Congo*

Le fleuve Congo est *le plus profond du monde* avec des profondeurs dépassant *220 mètres* !

🌊 Il est aussi :
• Le *2ᵉ fleuve en débit* après l'Amazone
• Long de *4 700 km*
• Source d'eau douce pour *millions de personnes*

Son bassin abrite la *2ᵉ plus grande forêt tropicale du monde*, les bonobos 🦍, l'okapi et les gorilles de montagne.

Un trésor naturel pour toute la planète. 💚`,

    midi: `🎭 *Midi Culturel — Les Masques Kuba*

Les masques du *Royaume Kuba* (Kasaï) sont parmi les plus sophistiqués d'Afrique.

Leurs motifs géométriques raffinés ont fasciné les artistes européens... et on dit que *Pablo Picasso* s'en est inspiré pour créer le *mouvement cubiste* ! 🎨

Ces masques sont aujourd'hui exposés au :
🏛 MoMA de New York
🏛 British Museum de Londres
🏛 Musée du Quai Branly à Paris

*L'art congolais a changé l'histoire de l'art mondial.* 🌍`,

    soir: `🌿 *Recette du soir — Pondu (Saka Saka)*

Le ragoût de feuilles de manioc, plat quotidien congolais ! 🇨🇩

*Ingrédients :*
• 500g de feuilles de manioc (fraîches ou surgelées)
• 3 c. à soupe d'huile de palme
• 1 oignon · 3 gousses d'ail
• Poisson fumé ou crevettes séchées
• Sel, piment

*Préparation :*
1️⃣ Piler ou mixer les feuilles de manioc
2️⃣ Faire revenir oignon + ail dans l'huile de palme
3️⃣ Ajouter les feuilles + poisson fumé + eau
4️⃣ Cuire 30–40 min en remuant
5️⃣ Servir avec du fufu ou du riz

*Nutritif, économique et délicieux !* 😋`,

    nuit: `🌙 *Bonsoir — Langue du soir : Lingala*

🗣 *Apprenez le Lingala en 5 minutes !*

👋 *Salutations :*
• _"Mbote na yo"_ → Bonjour / Salut
• _"Ozali malamu ?"_ → Comment vas-tu ?
• _"Malamu, na zali bien"_ → Je vais bien

❤️ *Expressions du cœur :*
• _"Nakokipa yo"_ → Je t'aime
• _"Yo ozali moninga na ngai"_ → Tu es mon ami(e)

🙏 *Politesse :*
• _"Melesi"_ → Merci
• _"Tikala malamu"_ → Au revoir (reste bien)

Essayez de dire _"Mbote !"_ à quelqu'un demain ! 😊
_Bonne nuit ! 🌙_`
  },

  // ── JOUR 3 ──────────────────────────────────────────────────────────────────
  {
    matin: `🇨🇩 *Bonjour depuis le Congo !*

👘 *Fait du jour — Le Mouvement Sapeur*

Les *Sapeurs* (Société des Ambianceurs et des Personnes Élégantes) sont des hommes de Kinshasa qui se consacrent à l'*élégance vestimentaire extrême* comme forme de résistance culturelle.

En portant des costumes griffés italiens dans des quartiers modestes, ils affirment :
💬 _"L'élégance n'appartient pas aux riches."_

Leurs tenues colorées contrastent avec la pauvreté ambiante — un acte de *dignité et de liberté*. 🎩

Le photographe Daniele Tamagni a immortalisé leur culture dans un livre mondial. 📸`,

    midi: `🥁 *Midi Musical — Le Soukous*

Après la Rumba, le *Soukous* (années 1960–80) a conquis l'Afrique entière !

🎸 Caractéristiques :
• Tempos *beaucoup plus rapides*
• Solos de guitare *virtuoses*
• Basses profondes et énergie explosive

Les musiciens congolais ont émigré à *Paris, Nairobi, Lagos*... répandant ce son à travers le monde. Le Soukous est souvent désigné comme la *première musique pop panafricaine*.

🎤 *Artistes clés :*
→ Papa Wemba · Kanda Bongo Man
→ Mbilia Bel · Zaïko Langa Langa
→ Awilo Longomba

🎧 Cherchez _"Papa Wemba Yolele"_ ! 🔥`,

    soir: `🐟 *Recette du soir — Liboke de Poisson*

La méthode de cuisson *unique au Congo* : tout dans des feuilles de bananier ! 🍃

*Ingrédients :*
• 2 tilapias entiers (ou capitaines)
• Feuilles de bananier
• 3 tomates · 1 oignon · Ail · Piment
• Huile de palme · Sel · Épices locales

*Préparation :*
1️⃣ Nettoyer et mariner le poisson 30 min
2️⃣ Préparer les légumes en brunoise
3️⃣ Poser le poisson + légumes sur une feuille de bananier
4️⃣ Refermer hermétiquement et ficeler
5️⃣ Griller sur braises *45 min* en retournant

*Résultat :* Un arôme terreux et fumé incomparable ! 🔥`,

    nuit: `🌙 *Bonsoir — Tradition : La Dot*

💍 *Le Mariage Congolais (Libala)*

En RDC, un mariage est une union entre *deux familles entières*, pas seulement deux individus.

*Les étapes :*
1️⃣ *La Dot (Lobola)* — La famille du marié remet des cadeaux à la famille de la mariée : argent, pagnes, nourriture, boissons. Un acte de respect.

2️⃣ *Le Mariage Coutumier* — Danses, musique, festin communautaire. Tenues en *Kitenge assorti* pour les deux familles.

3️⃣ *La Cérémonie Religieuse ou Civile*

Un mariage congolais peut durer *3 à 5 jours* ! 🎉

_Bonne nuit ! 🌙 Que vos liens familiaux soient solides comme le Congo._ 🇨🇩`
  },

  // ── JOUR 4 ──────────────────────────────────────────────────────────────────
  {
    matin: `🇨🇩 *Bonjour depuis le Congo !*

🏀 *Célébrité du jour — Dikembe Mutombo*

Né en *1966 à Kinshasa*, Dikembe Mutombo est l'une des plus grandes légendes de la NBA.

🏆 *4× Meilleur Défenseur NBA*
📏 *2,18m* — surnommé "The Shot Blocker"
🖕 Son geste du doigt _"No, no, no"_ après un contre est entré dans la légende

Au-delà du sport, il a financé de sa propre poche un *hôpital de 29 millions $* à Kinshasa et est devenu *Ambassadeur de l'ONU*.

_Dikembe nous a quittés en septembre 2024. Une fierté congolaise éternelle._ 🙏💙`,

    midi: `🎨 *Midi Artistique — Chéri Samba*

*Chéri Samba* (né en 1956) est le peintre congolais le plus célèbre au monde.

Ses toiles colorées et narratives mêlent :
🎨 Humour et ironie
🗣 Critique sociale et politique
🏙 Scènes de la vie quotidienne à Kinshasa

Ses œuvres sont exposées au :
🏛 *MoMA* de New York
🏛 *Centre Pompidou* de Paris
🏛 *Tate Modern* de Londres

Il est considéré comme l'un des artistes africains les plus importants du XXᵉ siècle. 🌍

*L'art congolais au sommet du monde.* 🖼`,

    soir: `🍌 *Recette du soir — Makemba Frits (Plantains)*

L'accompagnement universel de la cuisine congolaise ! 🇨🇩

*2 façons de les préparer :*

🟡 *Plantains mûrs (sucrés) :*
• Couper en diagonale
• Frire dans l'huile de palme 3–4 min/côté
• Servir avec du poulet ou du poisson

🟢 *Plantains verts (salés) :*
• Couper en rondelles épaisses
• Faire tremper dans l'eau salée 10 min
• Frire jusqu'à dorés et croustillants

*Astuce :* Les plantains mûrs = meilleur avec le Pondu. Les verts = meilleur avec le Poisson Braisé ! 😋`,

    nuit: `🌙 *Bonsoir — Histoire : Patrice Lumumba*

📖 *L'icône de l'indépendance africaine*

Le *30 juin 1960*, le Congo obtient son indépendance de la Belgique.

*Patrice Lumumba* (1925–1961) devient le *1er Premier Ministre* du Congo indépendant.

Dans son discours historique, il dit :
💬 _"Nous ne sommes plus vos singes."_

Un homme visionnaire, panafricaniste, assassiné à seulement *35 ans* dans des circonstances impliquant des puissances étrangères.

Son héritage inspire toute l'Afrique encore aujourd'hui. ✊🌍

_Bonne nuit. N'oublions jamais d'où nous venons._ 🇨🇩`
  },

  // ── JOUR 5 ──────────────────────────────────────────────────────────────────
  {
    matin: `🇨🇩 *Bonjour depuis le Congo !*

🦍 *Fait du jour — Les Gorilles des Virunga*

Le *Parc National des Virunga* en RDC est l'un des endroits les plus extraordinaires de la planète.

🦍 Il abrite les *gorilles de montagne*, espèce en danger critique — il en reste moins de *1 000 dans le monde* !

🌋 Le parc contient aussi des volcans actifs dont le *Nyiragongo*, avec le plus grand lac de lave de la planète.

🐦 Plus de *700 espèces d'oiseaux* y vivent.

Un patrimoine naturel mondial que le Congo protège fièrement. 🌿`,

    midi: `🎵 *Midi Musical — Fally Ipupa*

*Fally Ipupa* est la superstar congolaise de sa génération !

Né en *1977 à Kinshasa*, il a débuté avec Koffi Olomidé avant de lancer une carrière solo explosive.

🏆 *Ses records :*
• Stades plein à Kinshasa, Paris, Bruxelles...
• Collaborations avec des artistes mondiaux
• Des millions de streams sur Spotify
• Reconnu parmi les *50 artistes les plus influents d'Afrique*

🎶 Son style fusionne :
Ndombolo · Afropop · R&B · Soukous moderne

🎧 Cherchez *"Fally Ipupa Elya"* ou *"Droit Chemin"* ! 🔥`,

    soir: `🍲 *Recette du soir — Fufu Maison*

La base de toute la cuisine congolaise ! 🇨🇩

*Fufu de Manioc :*

*Ingrédients :*
• 500g de farine de manioc (ou farine de maïs)
• 1 litre d'eau bouillante
• 1 pincée de sel

*Préparation :*
1️⃣ Porter l'eau à ébullition dans une grande casserole
2️⃣ Verser la farine en pluie en remuant *sans arrêt*
3️⃣ Pétrir vigoureusement avec une spatule en bois
4️⃣ Cuire à feu moyen *15–20 min* en remuant constamment
5️⃣ La pâte doit être *lisse, épaisse et se détacher* de la casserole

*Comment manger :* Prendre une boulette, faire un creux avec le pouce et tremper dans le Pondu ou la sauce. 😋`,

    nuit: `🌙 *Bonsoir — Les Peuples Mbuti*

🌿 *Les gardiens de la forêt du Congo*

Les *Mbuti* (Pygmées) de la forêt *Ituri* sont parmi les peuples les plus anciens d'Afrique — leurs ancêtres habitent cette forêt depuis plus de *40 000 ans*.

Leur culture est unique :
🎵 Leur musique polyphonique (*Hindewhu*) a fasciné les ethnomusicologues du monde entier
🏹 Chasseurs-cueilleurs en harmonie totale avec la forêt
🙏 Ils croient que la forêt est un être vivant et bienveillant

En *2003*, leur musique a été envoyée dans l'espace comme représentation de la musique humaine. 🚀

*Les Mbuti rappellent que l'humanité et la nature ne font qu'un.* 🌍

_Bonne nuit ! 🌙_`
  },

  // ── JOUR 6 ──────────────────────────────────────────────────────────────────
  {
    matin: `🇨🇩 *Bonjour depuis le Congo !*

🧵 *Fait du jour — Le Tissu Kitenge*

Le *Kitenge* (ou wax) est bien plus qu'un tissu — c'est une *langue visuelle*.

Chaque motif a :
📛 Un *nom* (souvent un proverbe ou une histoire)
💬 Une *signification* (amour, résilience, fertilité...)
🎨 Des couleurs qui parlent de *région et d'identité*

Porté lors des mariages, funérailles, naissances et au quotidien, il unit les peuples d'Afrique centrale.

Les créateurs de mode congolais ont emmené le Kitenge sur les *podiums de Paris et Milan*. 🌍✨`,

    midi: `🥁 *Midi Musical — Le Ndombolo*

Dans les années 1990, un nouveau son explose à Kinshasa : le *Ndombolo* !

Caractéristiques :
🔊 Basses encore plus profondes
⚡ Rythme ultra-rapide et percussif
💃 Mouvements de danse spectaculaires et expressifs

Certains gouvernements africains ont tenté d'*interdire* ses danses jugées trop provocatrices — ce qui n'a fait qu'augmenter sa popularité ! 😂

🎤 *Artistes phares :*
→ Koffi Olomidé — "Loi"
→ Werrason — Wenge Musica
→ JB Mpiana · Extra Musica

🎧 Cherchez *"Koffi Olomidé Loi"* — vous ne résisterez pas ! 🕺`,

    soir: `🔥 *Recette du soir — Poisson Braisé de Kinshasa*

Le street food emblématique de la capitale ! 🇨🇩

*Ingrédients :*
• 2 tilapias entiers
• Jus de 2 citrons · 4 gousses d'ail écrasées
• 1 oignon · Piment fort · Sel · Poivre
• Huile de palme pour badigeonner

*Marinade (30 min minimum) :*
Mélanger citron + ail + piment + sel et badigeonner le poisson incisé.

*Cuisson :*
1️⃣ Préparer des braises bien chaudes (charbon de bois idéalement)
2️⃣ Badigeonner d'huile de palme
3️⃣ Griller *20 min par côté* à feu moyen
4️⃣ Servir avec plantains frits + sauce piment-tomate 🌶

*L'odeur à elle seule est inoubliable.* 😋`,

    nuit: `🌙 *Bonsoir — Tradition : La Naissance*

👶 *La Cérémonie de Naissance en RDC*

L'arrivée d'un enfant est un événement communautaire majeur !

*Les rituels :*
🎵 Des *chants et danses* accueillent le nouveau-né
📛 Le *nom* est soigneusement choisi — souvent celui d'un ancêtre pour faire vivre sa mémoire
📢 Le nom est *annoncé publiquement* à toute la communauté
🍽 Un *festin communautaire* rassemble familles et voisins
🙏 Des *bénédictions* des anciens protègent l'enfant

*Chez les Mongo :* La fête peut durer plusieurs jours avec bière de maïs et tambours (ngoma) ! 🥁

_Chaque naissance est une victoire collective._ 💚

_Bonne nuit ! 🌙_`
  },

  // ── JOUR 7 ──────────────────────────────────────────────────────────────────
  {
    matin: `🇨🇩 *Bonjour depuis le Congo !*

📚 *Fait du jour — Les Langues du Congo*

La RDC est l'un des pays linguistiquement les plus riches du monde avec *plus de 200 langues* !

*Les 4 langues nationales :*
🎤 *Lingala* — Kinshasa & musique (~40M locuteurs)
🌍 *Swahili* — Est du Congo (~30M)
🏔 *Kikongo* — Bas-Congo (~15M)
💎 *Tshiluba* — Kasaï (~12M)

+ *Le Français* comme langue officielle

Un Congolais moyen parle *3 à 5 langues* couramment. Ce multilinguisme est une richesse unique ! 🌟`,

    midi: `🗿 *Midi Artistique — Les Nkisi Nkondi*

Les *Figures Nkisi Nkondi* sont parmi les objets les plus puissants de l'art africain.

Ces sculptures en bois du peuple *Kongo* sont couvertes de clous, de pointes et de lames. Chaque clou enfoncé *activait l'esprit* (nkisi) à l'intérieur pour :
⚖️ Rendre la justice
🏥 Guérir les malades
🛡 Protéger la communauté
🤝 Sceller un pacte sacré

Ces figures ont *fasciné les surréalistes européens* (Breton, Ernst...) et se trouvent aujourd'hui dans les plus grands musées du monde.

*Un art spirituel d'une puissance incomparable.* 🌍`,

    soir: `🍃 *Recette du soir — Bâton de Manioc (Chikwangue)*

L'en-cas de voyage et de tous les jours en RDC ! 🇨🇩

*Ingrédients :*
• 1 kg de manioc frais épluché
• Feuilles de marantacées (ou papier aluminium si non disponible)
• Eau · Sel
• Ficelle pour attacher

*Préparation :*
1️⃣ Râper ou broyer le manioc en pâte
2️⃣ Presser dans un chiffon propre pour extraire l'eau
3️⃣ *Laisser fermenter 2–3 jours* à température ambiante
4️⃣ Envelopper dans les feuilles et ficeler solidement
5️⃣ Faire bouillir *3–4 heures*

*Goût :* Dense, légèrement acide, élastique. Se conserve plusieurs jours ! 🏆`,

    nuit: `🌙 *Bonsoir — L'Ubuntu Congolais*

💬 *Philosophie du soir*

_"Muntu ni muntu ngabantu"_ (Swahili)

🇫🇷 *Traduction :*
_"Une personne est une personne grâce aux autres"_

C'est le cœur de la philosophie *Ubuntu* — présente dans toute l'Afrique subsaharienne mais profondément ancrée au Congo.

Elle signifie :
🤝 Personne ne réussit seul
👨‍👩‍👧‍👦 La communauté est plus grande que l'individu
❤️ La solidarité est une force, pas une faiblesse

*Ubuntu a influencé Nelson Mandela, Desmond Tutu... et devrait inspirer le monde entier.* 🌍

_Merci d'être là. À demain pour une nouvelle semaine de culture congolaise !_ 🇨🇩🙏

_Bonne nuit ! 🌙_`
  }
];

module.exports = DAILY_CONTENT;
