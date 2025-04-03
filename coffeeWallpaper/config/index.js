export const config = {
  /** 是否使用mock代替api返回 */
  useMock: true,
};

export const WallpaperTypeMap = {
  "home": ["swiper ", "live_wallpaper", "AI_wallpaper", "Nostalgia_game", "scenery", "speed", "recommend"],
  "live_wallpaper": ["live_wallpaper"],
  "AI_wallpaper": ["AI_wallpaper"],
  "Nostalgia_game": ["Nostalgia_game"],
  "scenery": ["scenery"],
  "speed": ["speed","car","motor"],
  "recommend": ["recommend","art","girl","cartoon","animal"]
};

export const CatalogTabMap = {
  "live_wallpaper": [{
                text: '精选推荐',
                key: 0,
              }],
  "AI_wallpaper": [{
                text: '精选推荐',
                key: 0,
              }],
  "Nostalgia_game": [{
                text: '精选推荐',
                key: 0,
              }],
  "scenery": [{
                text: '精选推荐',
                key: 0,
              }],
  "speed": [
          {
            text: '精选推荐',
            key: 0,
          },
          {
            text: '急速视界',
            key: 1,
          },
          {
            text: '飞驰摩托',
            key: 2,
          },
          ],
  "recommend": [
          {
            text: '精选推荐',
            key: 0,
          },
          {
            text: '概念艺术',
            key: 1,
          },
          {
            text: '星颜捕手',
            key: 2,
          },
          {
            text: '次元基地',
            key: 3,
          },
          {
            text: '可爱萌宠',
            key: 4,
          },
  ]
};

export const DomainFalskUrl =
  'https://www.example.cn/';  //替换成自己的服务器地址
  
export const DomainImagesUrl =
  'https://www.example.cn';   //替换成自己的服务器地址
  
export const cdnBase =
  'https://example';  //替换成自己的服务器地址
