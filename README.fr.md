[ 🌐 عربي ](README.ar.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Outil de Présélection des Opérations d'Aménagement Immobilier : Modèle Excel de Faisabilité et de Modélisation Financière

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)
![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)
![Tool Type](https://img.shields.io/badge/Tool-Decision%20Support-success.svg)

> L'**Outil de Présélection des Opérations d'Aménagement Immobilier** est un **modèle Excel de modélisation financière et application web** léger, conçu pour évaluer rapidement les **opportunités d'aménagement résidentiel**, y compris les **lotissements de terrains** et les **projets de maisons de ville à plusieurs logements**. Comparez les terrains comparables, estimez les coûts de construction, calculez la Gross Realization Value (GRV) et déterminez votre seuil de Profit on Cost (POC) — sans avoir à construire de zéro un modèle de faisabilité d'aménagement complexe pour chaque opportunité.

**Essayez d'abord le calculateur de présélection d'opérations, gratuit et accessible dans le navigateur. Sans inscription. Sans installation. 100 % gratuit.**

Pour les professionnels de l'immobilier qui ont besoin d'un **classeur hors ligne réutilisable**, d'historiques d'opérations conservés, d'hypothèses financières modifiables et d'une présélection rapide et répétable pour leur pipeline d'acquisitions, la version Excel est disponible en achat unique avec une **garantie de remboursement de 30 jours, sans questions posées**.

*   **🌐 [Essayez l'application web gratuite de présélection des opérations immobilières](https://hyvoid.github.io/real-estate-development-feasibility-excel/)** → Ouvrez le calculateur HTML interactif fourni avec le projet pour réaliser une analyse préliminaire rapide.
*   **📥 [Téléchargez le modèle Excel réutilisable de faisabilité d'aménagement](https://theseusworkshop.com/l/mmabu?utm_source=github&utm_medium=GitHub%20README)** → Obtenez le classeur hors ligne complet pour enregistrer vos opérations, ajuster les hypothèses d'analyse de risque avancées et normaliser vos notes d'investissement.

Ce kit d'outils transforme une question ambiguë d'acquisition de terrain en phase amont en un processus structuré et fondé sur les données :

**Évaluer la valeur résiduelle du terrain → Projeter la Gross Realization Value (GRV) à partir des ventes comparables → Calculer le coût total d'aménagement (coûts durs et indirects) → Évaluer le Return on Investment (ROI) au regard de vos seuils de rendement.**

La méthodologie financière sous-jacente est spécifiquement optimisée pour la **présélection des lotissements résidentiels et des projets multifamiliaux / de maisons de ville**. Elle est volontairement plus légère qu'un modèle complet de faisabilité avec des flux de trésorerie sur 60 mois. L'objectif principal est d'identifier les opportunités hors marché rentables et d'écarter les sites non viables *avant* d'engager des capitaux importants dans une étude préalable architecturale, les autorisations d'urbanisme, la structuration du capital et l'acquisition formelle du site.
<img width="1163" height="790" alt="image" src="https://github.com/user-attachments/assets/f10a4379-a8ca-45eb-a2e5-28fc56175a5c" />

## Points de friction de l'aménagement immobilier résolus : ce que ce modèle de faisabilité suit

| Point de friction | Solution |
| :--- | :--- |
| **Surcharger le prix du terrain** | Calcule la **valeur résiduelle du terrain étayée par le marché** au lieu de se fier au prix demandé par le vendeur ou aux rumeurs du marché. |
| **Surestimer les recettes de vente** | Projette la **réalisation brute et nette attendue**, dérivée directement des preuves de ventes résidentielles comparables vérifiées (comps). |
| **Déborder le budget avec des frais cachés** | Consolide **les coûts d'acquisition du terrain, les estimations de coûts durs de construction, les coûts indirects (frais professionnels et municipaux), les budgets d'aléas et l'exposition au portage financier** dans une seule vue pro forma du projet. |
| **Planification de densité défaillante** | Expose l'**économie par unité** des projets de maisons de ville à plusieurs logements, en détaillant le coût du terrain par logement et la surface de plancher brute (GFA) moyenne par unité. |
| **Décisions d'investissement purement émotionnelles** | Compare le **Profit on Cost (POC) réel à votre taux de rendement minimal strict**, et produit une décision commerciale définitive : `PASS`, `FAIL` ou `PENDING INPUT`. |
| **Négociations dans l'impasse** | Détermine par rétro-ingénierie le **prix d'acquisition requis pour sauver une opération faible**, transformant la négociation avec le vendeur en une variable mathématique précise plutôt qu'en un deuxième tableur de suppositions. |

## Tutoriel pas à pas : comment présélectionner des opérations d'aménagement en quelques minutes

### 1. Définir votre mandat d'investissement et vos paramètres de référence
**Action :** Définissez les hypothèses d'investissement globales qui régissent votre capital. 
Le classeur centralise vos indicateurs financiers de référence : devise de base, seuil cible de Profit on Cost (POC), taux de droits de mutation, pourcentages de frais professionnels, marges de sécurité pour les aléas de construction et commissions de vente des agents immobiliers.
*Astuce : le seuil d'investissement POC par défaut est fixé à **25,00%**, mais il peut être ajusté globalement lorsque le mandat d'investissement ou l'appétit au risque de votre fonds évolue.*

### 2. Saisir les données de l'opération et les biens comparables (comps)
**Action :** Renseignez les données physiques du site et les données de marché.
Choisissez votre scénario d'aménagement résidentiel proposé (par exemple lotissement vs. vente en l'état futur) et saisissez :
*   Surface totale du terrain et contraintes d'urbanisme
*   Rendement d'aménagement proposé (nombre total d'unités / lots)
*   Surface de plancher brute (GFA) cible
*   Prix d'achat convenu ou spéculatif
*   Enveloppes budgétaires pour les frais juridiques d'acquisition et l'étude préalable
*   **Jusqu'à 10 terrains comparables** pour justifier la valeur du site
*   **Jusqu'à 10 comparables de vente au détail / de biens terminés** pour justifier la valeur de sortie brute (GRV)
*   Coûts durs de construction par M² / SQFT
*   Contributions d'aménagement à la collectivité / à la commune
*   Enveloppes budgétaires pour le marketing, le juridique et les intérêts financiers capitalisés

### 3. Générer l'analyse de faisabilité automatisée et la décision de ROI
**Action :** Vérifiez le calcul pro forma instantané.
Le moteur de calcul se met à jour automatiquement dès que vous saisissez des données — aucune macro de recalcul manuel n'est requise. Le tableau de bord de décision final révèle immédiatement le coût total du projet, le bénéfice net d'aménagement, le POC obtenu, l'écart par rapport au seuil cible et l'état d'investissement résultant : `PASS`, `FAIL` ou `PENDING INPUT`. 

### 4. Exporter la note d'investissement et passer au modèle Excel pour un usage répété
**Action :** Archivez le résultat de la présélection et normalisez votre pipeline.
Une fois un site présélectionné dans le navigateur, exportez-le sous forme de note d'investissement de présélection PDF compacte d'une seule page, à présenter à votre comité d'acquisition ou à vos prêteurs. 
**Vous avez aimé l'outil web gratuit ?** Pour évaluer plusieurs sites, ajuster les formules, conserver les données historiques des opérations et éviter de ressaisir vos paramètres de référence à chaque fois, **[téléchargez la version Excel réutilisable du modèle de faisabilité](https://theseusworkshop.com/l/mmabu?utm_source=github&utm_medium=GitHub%20README)** pour une présélection immobilière hors ligne sans limite.

## Pourquoi j'ai construit cet outil d'analyse de risque immobilier

La présélection des opérations d'aménagement en phase amont échoue souvent pour une raison simple : les données d'analyse de risque essentielles sont dispersées.

Un prix de terrain traîne dans un fil d'e-mails. Les ventes comparables (comps) se trouvent dans un rapport CMA distinct. Les coûts durs de construction sont envoyés par SMS par un entrepreneur. Les redevances d'urbanisme de la collectivité sont estimées grossièrement sur un carnet. Les coûts de portage financier sont traités comme une marge vague. La décision finale « Go/No-Go » est alors prise à partir d'un tableur fragmenté assemblé manuellement, qui ne montre pas comment ces variables commerciales interagissent dynamiquement.

Cela crée une erreur analytique majeure en capital-investissement immobilier : **optimiser un indicateur unique (comme le prix du terrain) en perdant de vue l'économie globale de l'opération et la structure du capital.**

Un site peut sembler extrêmement bon marché au regard des transactions foncières récentes, mais finit par saigner de l'argent une fois les commissions de vente, les honoraires d'architecte, les aléas obligatoires, les taux de financement mezzanine et les dérives des coûts durs de construction intégrés au pro forma. 

À l'inverse, un site de densification apparemment surévalué peut dégager des rendements considérables, car le zonage à forte densité (rendement) et la tarification premium du produit fini soutiennent l'important effort de capital engagé.

Ce modèle industrialise exactement ce raisonnement institutionnel. 

Par exemple, un projet de quatre maisons de ville peut sembler viable au départ sur la base d'un prix de terrain faible. Mais une fois confronté à des comps de vente au détail et à la pile *complète* des coûts d'aménagement, le POC passe sous le seuil de 20 %. Soudain, la question la plus importante n'est plus « Aimons-nous ce quartier ? » mais plutôt : « À quel prix d'acquisition maximal exact ce projet devient-il un investissement finançable ? »

Ce modèle fonctionne comme un **cadre de présélection d'acquisition de sites reproductible**, et non comme un tableur de faisabilité fragile et à usage unique. Il oblige les promoteurs et les analystes à répondre aux mêmes questions commerciales pour chaque piste hors marché avant d'engager des milliers d'euros dans une étude préalable formelle.

## Défis du secteur résolus : analyse de risque traditionnelle vs. présélection optimisée

| Défi du secteur (point de friction) | Méthodes d'analyse de risque traditionnelles | Processus optimisé de présélection (solution) |
| :--- | :--- | :--- |
| **Ancrage sur la valeur résiduelle du terrain** | Les décisions d'acquisition de sites sont fortement biaisées par le prix demandé du vendeur ou par le discours du courtier. | Intègre jusqu'à 10 transactions foncières comparables récentes afin d'établir un **point de référence de valeur de marché** strict et fondé sur les données. |
| **Optimisme sur la Gross Realization Value (GRV)** | Les recettes de sortie du produit fini sont estimées indépendamment de l'absorption du marché local et des plafonds de prix. | Utilise des **ventes résidentielles comparables** vérifiées pour piloter précisément les calculs de réalisation brute et de recettes nettes. |
| **Accumulation des coûts indirects et des CapEx** | Les droits de mutation, les honoraires d'architecte, les taxes d'urbanisme, les aléas de construction et les intérêts capitalisés sont souvent oubliés ou sous-estimés. | L'ensemble de la **pile de dépenses d'investissement (CapEx) et de coûts indirects** est consolidé dans un pro forma de niveau projet de qualité institutionnelle. |
| **Cécité à la densité et au rendement** | Les projets multifamiliaux et de lotissement sont jugés uniquement sur les recettes brutes, sans aucune analyse d'efficience. | Calcule le **rendement unitaire strict et l'économie par logement**, révélant exactement comment la base du terrain et les coûts durs se répartissent sur le site. |
| **Ambiguïté du taux de rendement minimal** | Les comités d'investissement décident si une opération « paraît acceptable » sur la base de biais personnels incohérents et d'objectifs mouvants. | Le POC du projet est benchmarksé mathématiquement par rapport à un **taux de rendement minimal verrouillé**, produisant un verdict standardisé et depourvu d'émotion. |
| **Négocier sans pro forma** | Les acheteurs soumettent des intentions d'achat (LOI) basses sans savoir si la réduction de prix satisfait effectivement leur ROI minimal. | L'**offre maximale acceptable (MAO)** peut être ajustée dynamiquement, recalculant instantanément l'économie du projet pour déterminer le prix d'acquisition d'équilibre. |

## Scénarios d'investissement immobilier et cas d'usage de recherche à longue traîne

Ce modèle est volontairement conçu pour couvrir et rationaliser les calculs d'aménagement les plus courants, notamment :
*   *Comment calculer la marge sur une subdivision de terrain résidentielle.*
*   *Estimer les coûts durs et indirects pour une construction de maisons de ville à plusieurs logements.*
*   *Déterminer par rétro-ingénierie la valeur résiduelle du terrain pour des acquisitions de sites hors marché.*
*   *Créer une note d'investissement immobilier d'une page pour des partenaires en co-investissement (JV).*
*   *Écarter rapidement les opérations de revente et de spéculation immobilière non viables.*

## Pour qui : rôles cibles et usages logiciels recommandés

Ce cadre est conçu pour les professionnels de l'immobilier qui exigent de la vitesse et de la précision en début de cycle d'opération :

*   **Analystes en acquisitions immobilières** : qui utilisent un *modèle Excel de présélection des opérations d'aménagement* pour filtrer rapidement et quotidiennement le pipeline d'opérations de l'agence.
*   **Promoteurs immobiliers indépendants** : qui s'appuient sur un *modèle de faisabilité pour maisons de ville* pour évaluer des acquisitions de sites hors marché avant de recruter des architectes.
*   **Gérants de fonds d'investissement immobilier** : qui déploient un *outil de filtrage des opérations résidentielles* pour standardiser la manière dont les analystes juniors analysent le risque et présentent les nouveaux actifs.
*   **Courtiers en immobilier commercial (vente de terrains)** : qui s'appuient sur un *outil de calcul de la valeur résiduelle du terrain* pour valider les prix demandés et construire des pitch decks convaincants à l'intention des acquéreurs promoteurs.
*   **Cabinets d'architecture et d'urbanisme** : qui utilisent un *modèle financier d'usage optimal (highest and best use)* pour démontrer la viabilité commerciale aux côtés des études préliminaires de capacité du site.

*Il est particulièrement utile lorsque l'objectif principal est une **présélection rapide des opérations en phase amont**, plutôt que de remplacer une prévision mensuelle de flux de trésorerie très détaillée, une structuration complexe du capital (modèles en cascade) ou l'analyse de risque finale du prêteur.*

## À propos

Je conçois des outils de suivi légers et des outils d'aide à la décision pour les situations où il y a trop de variables à gérer en même temps.

La question qui sous-tend chaque outil est simple :

> **Quelles informations doivent être réunies au même endroit pour prendre la prochaine décision avec confiance ?**

L'**Outil de Présélection des Opérations d'Aménagement Immobilier** applique cette approche à la présélection des acquisitions : les données relatives au terrain, les hypothèses d'aménagement, les données de vente, l'exposition aux coûts et la décision d'investissement qui en résulte sont réunies dans un processus reproductible unique.

## Détails techniques

<details>
<summary>Pour les réviseurs techniques, les praticiens d'Excel et les collaborateurs</summary>

### Architecture du classeur

Le classeur est structuré en quatre feuilles de calcul connectées :

| Feuille               | Rôle               | Responsabilité principale                                                                        |
| --------------------- | ------------------ | --------------------------------------------------------------------------------------------- |
| `00_Start_Here`       | Prise en main      | Instructions d'utilisation, légende des couleurs, explication de la méthodologie et exemple de référence complété |
| `01_Global_Settings`  | Paramètres         | Hypothèses d'investissement centrales, affichage de la devise, taux de rendement minimal et pourcentages de coûts standard |
| `02_Residential_Deal` | Moteur de décision | Présélection des lotissements résidentiels / du développement de logement individuel                |
| `03_Townhouse_Deal`   | Moteur de décision | Présélection des projets de maisons de ville à plusieurs logements                                |

L'architecture suit un flux unidirectionnel :

```text
RAW DEAL INPUTS
     │
     ├── Site / Yield / GFA
     ├── Land Comparables
     ├── Retail Comparables
     ├── Acquisition Assumptions
     └── Development Cost Assumptions
     │
     ▼
CALCULATION ENGINE
     │
     ├── Comparable Market Averages
     ├── Land Acquisition Cost
     ├── Gross Realisation
     ├── Selling Costs
     ├── Net Realisation
     ├── Development Costs
     ├── Finance Allowance
     └── Total Project Cost
     │
     ▼
DECISION LAYER
     │
     ├── Net Development Profit
     ├── Profit on Cost
     ├── Target POC
     └── PASS / FAIL / PENDING INPUT
```

Le système sépare volontairement les cellules de saisie déverrouillées des cellules de calcul et de présentation verrouillées. Le classeur est conçu pour empêcher les utilisateurs d'écraser la logique de calcul tout en rendant les hypothèses de l'opération faciles à identifier. 

La structure saisie → calcul → décision reste identique pour les scénarios résidentiel et maisons de ville. La version maisons de ville expose en outre des indicateurs au niveau de l'unité, car le rendement d'aménagement est un élément central de l'économie multifamiliale. 

### Cadre de décision

La chaîne économique centrale est la suivante :

```text
Comparable Land Evidence
        ↓
Land Market Price Benchmark
        ↓
Model-Indicated Land Value
        ↓
Actual Acquisition Cost
        ↓
Development + Finance Costs
        ↓
Finished-Property Comparable Evidence
        ↓
Gross Realisation
        ↓
Selling Costs
        ↓
Net Realisation
        ↓
Net Development Profit
        ↓
Profit on Cost
        ↓
Investment Hurdle
        ↓
PASS / FAIL
```

Le choix de conception important est que **le terrain, les recettes et les coûts d'aménagement ne sont pas évalués comme des questions séparées**. Ils convergent vers un seul test de rentabilité au niveau du projet.

### Trois pièges qui piègent même les acquéreurs immobiliers expérimentés

#### Piège 1 — Considérer le prix affiché comme la valeur du terrain

**1. Une décision a été prise.**

Une opportunité d'acquisition semble raisonnablement chiffrée par rapport aux attentes du vendeur.

**2. La décision reposait sur une hypothèse erronée passée inaperçue.**

Le prix affiché a été traité comme le repère territorial pertinent sans être normalisé par rapport aux preuves de transactions comparables.

**3. La recommandation change.**

Un projet peut sembler bon marché parce que l'acquéreur le compare à d'autres prix affichés plutôt qu'à des transactions réalisées.

**4. Pourquoi ce raisonnement est incorrect.**

Un prix affiché est une position d'offre. Ce n'est pas nécessairement une preuve de la valeur d'équilibre du marché.

**5. Approche corrigée.**

Utilisez les transactions réelles de terrains comparables pour établir un prix de référence au mètre carré.

**6. Résultat de décision corrigé.**

L'acquisition peut alors être évaluée par rapport à une valeur de terrain étayée par le marché, avant même de considérer l'économie de l'aménagement.

**7. Logique des formules**

<details>
<summary>Calcul du comparable de terrain</summary>

```excel
=IF(D14:D23="","",
   IF(ISNUMBER(C14:C23/D14:D23),
      ROUND(C14:C23/D14:D23,2),
      ""
   )
)
```

Le modèle ne moyenne ensuite que les valeurs comparables positives et valides :

```excel
=IFERROR(
   AVERAGE(
      FILTER(
         E14:E23,
         (ISNUMBER(E14:E23))*(E14:E23>0)
      )
   ),
   0
)
```

Le repère de marché obtenu sert à indiquer une valeur de terrain fondée sur le modèle :

```excel
=ROUND(C5*E24,0)
```

La conception de la source utilise explicitement le filtrage dynamique, de sorte que les lignes de comparables vides ne faussent pas la moyenne du marché. 

</details>

---

#### Piège 2 — Regarder le chiffre d'affaires brut au lieu de la réalisation nette

**1. Une décision a été prise.**

Un projet de maisons de ville semble très rentable parce que le prix de vente attendu multiplié par le nombre d'unités produit un montant de recettes brutes élevé.

**2. La décision reposait sur un chiffre erroné passé inaperçu.**

Les ventes brutes ont été traitées comme si elles constituaient la trésorerie disponible pour couvrir les coûts d'aménagement.

**3. La recommandation change.**

Une fois déduites les commissions de vente et les coûts de marketing et de juridique par unité, la marge économique peut être sensiblement plus faible.

**4. Pourquoi ce raisonnement est incorrect.**

Le promoteur ne conserve pas la valeur des ventes brutes. Les coûts de distribution et de vente s'intercalent entre le prix de vente affiché et les recettes réellement récupérables par le projet.

**5. Approche corrigée.**

Calculez d'abord la réalisation brute, puis déduisez explicitement les coûts de vente avant de comparer le résultat au coût du projet.

**6. Résultat de décision corrigé.**

Le projet est évalué sur la base de la **réalisation nette**, et non d'un chiffre de recettes brutes optimiste.

**7. Logique des formules**

<details>
<summary>Calcul de la réalisation</summary>

```excel
=ROUND(C6*D46,0)
```

```excel
=ROUND(C50*'01_Global_Settings'!$C$9,0)
```

```excel
=C51+(C6*C52)
```

```excel
=C50-C53
```

Le calcul suit donc la logique suivante :

```text
Gross Realisation
    − Agent Commission
    − Unit Marketing / Legal Costs
    = Net Realisation
```

La spécification de la source définit cela comme la base de la récupération nette du projet, avant déduction des coûts de projet. 

</details>

---

#### Piège 3 — Déclarer une opération conforme avant que la pile de coûts soit complète

**1. Une décision a été prise.**

Un projet semble générer une marge acceptable au vu du terrain, de la construction et des ventes attendues.

**2. La décision reposait sur un modèle erroné passé inaperçu.**

Les frais professionnels, les aléas, les contributions à la collectivité, les coûts de vente ou les enveloppes financières ont été omis ou traités séparément.

**3. La recommandation change.**

Le projet peut passer d'un niveau apparemment acceptable à un niveau inférieur au seuil d'investissement dès que la pile de coûts complète est intégrée.

**4. Pourquoi ce raisonnement est incorrect.**

La rentabilité est une relation entre la réalisation nette complète et le besoin total en capital du projet.

**5. Approche corrigée.**

Regroupez l'acquisition du terrain, l'aménagement et l'exposition financière avant de calculer le POC.

**6. Résultat de décision corrigé.**

Seule l'économie de projet complète est confrontée au seuil d'investissement.

**7. Logique des formules**

<details>
<summary>Moteur de décision au niveau du projet</summary>

```excel
=C31+C65+C69
```

```excel
=C54-C70
```

```excel
=IF(C70>0,C71/C70,0)
```

```excel
='01_Global_Settings'!$C$5
```

```excel
=IF(
   C70=0,
   "PENDING INPUT",
   IF(
      ROUND(C72,4)>=ROUND(C73,4),
      "PASS",
      "FAIL"
   )
)
```

Cela produit la séquence de décision suivante :

```text
Total Project Cost
        ↓
Net Development Profit
        ↓
Profit on Cost
        ↓
Target POC Threshold
        ↓
PASS / FAIL
```

La comparaison `ROUND(...,4)` vise explicitement à éviter les erreurs de frontière en virgule flottante lorsque le POC calculé est proche du seuil. 

</details>

### Exemple de scénario

Ce qui suit est un **scénario de présélection illustratif**, qui s'appuie sur la méthodologie du classeur et ne représente pas une transaction de marché sourcée.

Supposons un projet de quatre maisons de ville :

| Entrée                                          |  Valeur illustrative |
| --------------------------------------- | ------------------: |
| Surface du terrain                       |              800 m² |
| Nombre d'unités proposées                |                   4 |
| GFA cible                                 |              600 m² |
| Prix d'achat convenu                      |            $900,000 |
| Frais juridiques / étude préalable d'acquisition |             $15,000 |
| Droits de mutation                       |               5.50% |
| Valeur moyenne des terrains comparables   |           $1,150/m² |
| Prix de vente moyen des maisons de ville comparables |       $650,000/unit |
| Taux de construction                      |           $2,800/m² |
| Contribution à la collectivité            |        $12,000/unit |
| Frais professionnels                      | 6.00% of build cost |
| Aléas                                     | 5.00% of build cost |
| Enveloppe financière                      |            $100,000 |
| Commission de vente                       |               2.20% |
| Marketing / juridique                     |         $8,000/unit |
| POC cible                                 |              25.00% |

Le schéma de quatre unités produit une GFA moyenne de **150 m² par unité**.

Le coût de construction est le suivant :

```text
600 m² × $2,800
= $1,680,000
```

Les contributions à la collectivité sont les suivantes :

```text
4 × $12,000
= $48,000
```

Les frais professionnels sont les suivants :

```text
$1,680,000 × 6%
= $100,800
```

Les aléas s'élèvent à :

```text
$1,680,000 × 5%
= $84,000
```

Le coût d'acquisition est le suivant :

```text
$900,000
+ ($900,000 × 5.5%)
+ $15,000
= $964,500
```

La réalisation brute est la suivante :

```text
4 × $650,000
= $2,600,000
```

Les coûts de vente sont les suivants :

```text
$2,600,000 × 2.2%
+ (4 × $8,000)
= $89,200
```

La réalisation nette est donc la suivante :

```text
$2,600,000 − $89,200
= $2,510,800
```

Le coût total du projet devient :

```text
$964,500
+ $1,680,000
+ $48,000
+ $100,800
+ $84,000
+ $100,000
= $2,977,300
```

Cela produit :

```text
Net Development Profit
= $2,510,800 − $2,977,300
= −$466,500
```

Le résultat est nettement inférieur au seuil de 25 %.

La conclusion analytique n'est **pas simplement « la construction est trop chère »**. Le cadre de présélection complet montre que le projet est structurellement déficitaire sous ces hypothèses. La question commerciale suivante est de savoir si les hypothèses peuvent réellement évoluer — en particulier le prix d'acquisition, le prix de vente réalisable, le rendement ou le coût de construction — avant que l'opportunité ne mérite un travail approfondi.

C'est exactement là que le modèle de présélection est utile : il transforme une conversation vague du type « les chiffres peuvent peut-être fonctionner » en une décision quantifiée sur l'hypothèse qui doit changer.

### Référence des formules

<details>
<summary>Indicateurs de planification et par unité</summary>

**GFA moyenne par unité**

```excel
=IF(C6>0,ROUND(C7/C6,2),0)
```

**Coût du terrain par logement**

```excel
=IF(C6>0,ROUND(C31/C6,0),0)
```

Ces calculs sont particulièrement pertinents pour le scénario maisons de ville, car le même coût d'acquisition du site est réparti sur le nombre d'unités proposé. 

</details>

<details>
<summary>Moteur des comparables de terrain</summary>

**Prix comparable du terrain au mètre carré**

```excel
=IF(D14:D23="","",
   IF(ISNUMBER(C14:C23/D14:D23),
      ROUND(C14:C23/D14:D23,2),
      ""
   )
)
```

**Prix moyen des terrains comparables**

```excel
=IFERROR(
   AVERAGE(
      FILTER(
         E14:E23,
         (ISNUMBER(E14:E23))*(E14:E23>0)
      )
   ),
   0
)
```

**Valeur du terrain indiquée par le modèle**

```excel
=ROUND(C5*E24,0)
```

L'utilisation de `FILTER` signifie que les lignes vides sont exclues au lieu d'être traitées comme des transactions à valeur nulle. 

</details>

<details>
<summary>Moteur des comparables de vente et de la réalisation</summary>

**Prix de vente comparable au mètre carré**

```excel
=IF(E36:E45="","",
   IF(ISNUMBER(D36:D45/E36:E45),
      ROUND(D36:D45/E36:E45,2),
      ""
   )
)
```

**Prix unitaire moyen des comparables**

```excel
=IFERROR(
   AVERAGE(
      FILTER(
         D36:D45,
         (ISNUMBER(D36:D45))*(D36:D45>0)
      )
   ),
   0
)
```

**Réalisation brute**

```excel
=ROUND(C6*D46,0)
```

**Commission d'agent**

```excel
=ROUND(C50*'01_Global_Settings'!$C$9,0)
```

**Coûts de vente totaux**

```excel
=C51+(C6*C52)
```

**Réalisation nette**

```excel
=C50-C53
```

La conception de la source traite explicitement la moyenne des biens terminés comparables comme le repère de vente, puis passe de la réalisation brute à la réalisation nette en déduisant les coûts de vente. 

</details>

<details>
<summary>Moteur des coûts d'aménagement</summary>

**Coût total de construction**

```excel
=ROUND(C7*C58,0)
```

**Contributions à la collectivité**

```excel
=ROUND(C6*C60,0)
```

**Frais professionnels**

```excel
=ROUND(C59*'01_Global_Settings'!$C$7,0)
```

**Aléas avec valeur spécifique au projet**

```excel
=ROUND(
   C59*IF(
      C63="",
      '01_Global_Settings'!$C$8,
      C63
   ),
   0
)
```

**Coûts d'aménagement totaux**

```excel
=SUM(C59,C61,C62,C64)
```

La logique des aléas est volontairement hiérarchique : un taux spécifique au projet peut remplacer la valeur par défaut globale, tandis que le fait de laisser le champ du projet vide amène le modèle à hériter du paramètre central. 

</details>

<details>
<summary>Moteur de décision final</summary>

**Coût total du projet**

```excel
=C31+C65+C69
```

**Bénéfice net d'aménagement**

```excel
=C54-C70
```

**Profit on Cost**

```excel
=IF(C70>0,C71/C70,0)
```

**Seuil POC cible**

```excel
='01_Global_Settings'!$C$5
```

**Verdict sur l'opération**

```excel
=IF(
   C70=0,
   "PENDING INPUT",
   IF(
      ROUND(C72,4)>=ROUND(C73,4),
      "PASS",
      "FAIL"
   )
)
```

L'état de décision distingue volontairement un modèle incomplet d'un investissement qui échoue. `PENDING INPUT` n'est donc pas traité comme `FAIL`. 

</details>

### Règles de validation

| Champ / Domaine         | Règle                                                                | Comportement en cas d'erreur / de décision                              |
| ---------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------- |
| `Site_Area_SQM`        | Doit représenter une surface de site valide et positive                            | Des saisies incomplètes empêchent toute décision de projet pertinente    |
| `Proposed_Units_Yield` | Doit être supérieur à zéro là où des calculs par unité sont requis | Les calculs par unité sont protégés contre la division par zéro |
| `Target_GFA_SQM`       | Utilisé comme GFA total d'aménagement                                    | Détermine le coût de construction                                   |
| Lignes de comparables de terrain | Les lignes vides sont ignorées                                               | Les lignes vides ne diluent pas la moyenne du marché                |
| Surface des terrains comparables   | Nécessaire pour un calcul valide de prix unitaire du terrain                     | Les calculs non valides restent vides                          |
| Données de ventes comparables   | Uniquement des données de transaction numériques valides                                  | Les lignes non valides / vides sont exclues de la moyenne         |
| Prix d'achat         | Utilisé comme hypothèse d'acquisition réelle                            | Détermine le coût d'acquisition et le POC final                      |
| Droits de mutation             | Contrôlé de manière centralisée                                                 | Appliqué automatiquement au prix d'achat                    |
| Taux de frais professionnels  | Contrôlé de manière centralisée                                                 | Appliqué au coût de construction                                      |
| Aléas            | Valeur par défaut globale ou valeur spécifique au projet                          | Un taux de projet vide hérite des aléas globaux             |
| Enveloppe financière      | Saisie explicite au niveau du projet                                               | Inclus dans le coût total du projet                             |
| Coût du projet           | Doit être supérieur à zéro pour le POC                                    | Un coût nul renvoie `PENDING INPUT` au stade du verdict         |
| Comparaison du POC         | Arrondie avant la comparaison au seuil                                  | Évite les erreurs de frontière en virgule flottante                    |
| POC cible             | Seuil d'investissement central                                            | Détermine `PASS` / `FAIL`                                 |
| Protection du classeur    | Les cellules de calcul restent verrouillées                                      | Empêche l'écrasement accidentel des formules                |

L'implémentation s'appuie sur des zones de calcul verrouillées, des zones de saisie déverrouillées désignées, un filtrage dynamique des données comparables, des protections contre la division par zéro et des états de décision explicites comme éléments de la conception du contrôle des erreurs. 

### Règles d'utilisation du classeur

Le classeur utilise un langage visuel à trois états :

| État visuel | Signification                                 | Action de l'utilisateur                           |
| ------------ | --------------------------------------- | ------------------------------------- |
| Bleu clair    | Zone de saisie / déverrouillée                   | Saisir ou modifier les hypothèses de l'opération        |
| Blanc / gris | Zone de calcul ou de structure / verrouillée | Ne pas modifier                           |
| Vert        | `PASS`                                  | L'opération franchit le seuil de présélection      |
| Rouge          | `FAIL`                                  | L'opération passe sous le seuil de présélection |

La conception de la source prévoit des cellules de saisie bleu clair, des cellules de calcul verrouillées et une présentation conditionnelle du verdict en vert/rouge, afin de rendre le classeur utilisable par des utilisateurs métier non techniques. 

Pour un usage continu :

1. Ajoutez les transactions comparables directement dans les lignes de saisie désignées.
2. Supprimez les données comparables incorrectes en vidant la ligne de saisie correspondante.
3. Ne copiez pas de formules dans les zones de calcul.
4. Ne modifiez les hypothèses d'investissement globales que via la zone centrale de paramètres.
5. Ne supprimez pas la protection des feuilles et n'écrasez pas manuellement les cellules de calcul.

Les zones de calcul des comparables sont conçues pour absorber un nombre variable d'observations sans maintenance manuelle des formules. 

### Notes de plateforme et d'implémentation

La conception cible :

* **Microsoft 365**
* **Excel 2021 ou version ultérieure**
* **Google Sheets**

L'implémentation évite délibérément VBA/macros et s'appuie sur des fonctions de tableur modernes ainsi que sur une logique de tableau dynamique, afin que le classeur puisse rester un simple fichier `.xlsx` plutôt que de dépendre d'une couche d'automatisation propre à une application. 

L'architecture suit également un principe de **zéro codage en dur**. Les hypothèses centrales telles que le symbole de la devise, le seuil POC, les droits de mutation, les frais professionnels, les aléas et la commission d'agent sont centralisées plutôt que répétées sous forme de constantes littérales dans toute la couche de calcul. 

</details>

## La logique métier et la méthodologie

Le modèle repose sur un principe commercial simple : **une opération d'aménagement doit être présélectionnée à partir de l'interaction entre les preuves de marché, le prix d'acquisition, le coût d'aménagement et la valeur de sortie réalisable — et non à partir d'un seul chiffre alléchant.**

La méthodologie convertit ces intrants en une séquence de questions de plus en plus pertinentes pour la décision.

* **L'analyse du marché comparable** établit un point de référence pour le terrain et le produit résidentiel terminé. Cela réduit la dépendance à l'égard des prix demandés, des opinions isolées ou d'une hypothèse de vente unique et optimiste. La décision pratique devient : *La tarification d'acquisition et de sortie proposée est-elle étayée par des preuves de marché observables ?* 

* **L'agrégation de l'intégralité des coûts** considère l'acquisition, la construction, les services professionnels, les contributions à la collectivité, les aléas, les coûts de vente et le financement comme un même dossier économique. Cela résout le problème courant d'un projet qui semble rentable parce que des coûts importants restent encore en dehors du calcul affiché.

* **L'analyse de la réalisation nette** sépare les recettes de vente affichées du montant réellement disponible après les coûts de vente et de marketing. Cela rend l'hypothèse de sortie commercialement exploitable plutôt que simplement attirante sur le papier. 

* **La décision fondée sur des seuils** convertit un jugement subjectif du type « ça a l'air rentable » en une règle d'investissement reproductible. Avec un seuil POC par défaut de 25,00%, la même norme peut être appliquée aux opportunités résidentielles et de maisons de ville, tandis que le seuil central peut être modifié lorsque le mandat d'investissement évolue. 

* **La sensibilité au prix d'acquisition par négociation inversée** transforme un résultat de présélection défavorable en question commerciale. Si le projet ne franchit pas le seuil, le prix d'acquisition devient l'une des variables que l'on peut contester, au lieu d'accepter simplement les conditions initiales. La SOP du classeur traite explicitement la réduction du prix d'achat proposé comme une réponse pratique à un résultat `FAIL`. 

Le résultat ne remplace pas une étude préalable complète. C'est un filtre disciplined pour décider **quelles opportunités méritent le niveau de travail suivant**.

## Autres outils de cette série

* **Outils d'aménagement résidentiel** — cadres Excel légers pour estimer, budgéter et piloter l'économie de la construction et de l'aménagement.
* **Outils d'estimation de construction** — processus de BOQ, de métré, de soumission et de contrôle des coûts fondés sur des décisions de projet reproductibles.
* **Classeurs d'aide à la décision pour les entreprises** — modèles de tableur réutilisables qui transforment des données opérationnelles fragmentées en règles de décision explicites.

## Licence

Ce projet est publié sous la **licence Apache 2.0**.

Vous pouvez utiliser, modifier, distribuer et adapter le projet sous réserve des conditions de la licence Apache 2.0.
