#!/bin/bash
# Download product images from CS Capacetes
BASE="https://cscapacetes.com"

# Product images
PRODUCT_IMAGES=(
  "/products/norisk-soul-ii-grand-prix-south-africa.jpg"
  "/products/norisk-soul-ii-grand-prix-argentina.jpg"
  "/products/norisk-soul-ii-grand-prix-france.jpg"
  "/products/norisk-soul-ii-grand-prix-japan.jpg"
  "/products/norisk-soul-ii-grand-prix-brazil.jpg"
  "/products/norisk-soul-ii-grand-prix-uk.jpg"
  "/products/norisk-soul-ii-grand-prix-usa.jpg"
  "/products/norisk-soul-ii-manty-rosa-fosco.jpg"
  "/products/norisk-rock-preto-fosco.jpg"
  "/products/norisk-rock-branco.jpg"
  "/products/norisk-rock-nardo-cinza.jpg"
  "/products/norisk-razor-black-edition.jpg"
  "/products/norisk-razor-monocolor-black-edition.jpg"
  "/products/norisk-city-preto-fosco.jpg"
  "/products/norisk-city-branco.jpg"
  "/products/norisk-city-cinza-fosco.jpg"
  "/products/norisk-avenger-preto-fosco.jpg"
  "/products/norisk-avenger-branco.jpg"
  "/products/norisk-avenger-nardo-cinza.jpg"
  "/products/norisk-avenger-verde-fosco.jpg"
  "/products/norisk-darth-ii-preto-fosco.jpg"
  "/products/norisk-darth-ii-x1-amarelo-fosco.jpg"
  "/products/norisk-darth-ii-x1-vermelho-fosco.jpg"
  "/products/ls2-xdron-cyan.webp"
  "/products/ls2-rapid-athena-roxo.webp"
  "/products/ls2-f810-vingo-pink.webp"
  "/products/ls2-classic-draze-preto.jpg"
  "/products/ls2-xdron-cyborg.webp"
  "/products/ls2-rapid-preto-fosco.jpg"
  "/products/ls2-classic-draze-vermelho.jpg"
  "/products/ls2-stream-ii-preto.webp"
  "/products/ls2-classic-tribal-rosa.jpg"
  "/products/ls2-classic-tank-preto.jpg"
  "/products/ls2-starwar-vermelho.webp"
  "/products/ls2-classic-xdron-neon.jpg"
  "/products/ls2-tank-preto-purple.webp"
  "/products/ls2-classic-tribal-laranja.jpg"
  "/products/ls2-rapid-branco.jpg"
  "/products/ls2-classic-draze-azul.jpg"
  "/products/ls2-pro-monocolor-preto.webp"
  "/products/ls2-classic-tank-laranja.jpg"
  "/products/agv-blade-tab-italy-branco.jpg"
  "/products/agv-blade-zoo.jpg"
  "/products/agv-blade-valentino-heart.jpg"
  "/products/agv-turtle-verde-tartaruga.jpg"
  "/products/agv-turtle-azul.jpg"
  "/products/alpinestars-t-sps-v2-wp-preto.jpg"
  "/products/alpinestars-t-sps-wp-preto.jpg"
  "/products/intercomunicador-bluetooth-v10.jpg"
  "/products/viseira-norisk-ff302-fotocromatica.jpg"
  "/products/jaqueta-norisk-trip-air-feminina-rosa.jpg"
  "/products/jaqueta-norisk-tornado-feminina-branco.jpg"
  "/products/jaqueta-norisk-tornado-preto.jpg"
  "/products/jaqueta-norisk-tornado-cinza.jpg"
)

# Other images
OTHER_IMAGES=(
  "/images/acessorios-logo.png"
  "/images/norisk-logo.png"
  "/images/bump-viseira.webp"
  "/images/bump-narigueira.webp"
  "/images/bump-fone.jpg"
  "/favicon.png"
)

echo "Downloading product images..."
for img in "${PRODUCT_IMAGES[@]}"; do
  echo "  Downloading $img"
  curl -sSL "${BASE}${img}" -o "public${img}" 2>/dev/null || echo "  FAILED: $img"
done

echo "Downloading other images..."
for img in "${OTHER_IMAGES[@]}"; do
  echo "  Downloading $img"
  curl -sSL "${BASE}${img}" -o "public${img}" 2>/dev/null || echo "  FAILED: $img"
done

echo "Done!"
