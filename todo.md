# 可信联邦学习 - 配套资源网站开发计划

## Design Guidelines

### Design References
- Academic book companion sites (clean, professional, scholarly)
- Style: Modern Academic / Clean Minimalism

### Color Palette
- Primary: #2563EB (Blue 600)
- Primary Dark: #1D4ED8 (Blue 700)
- Primary Light: #DBEAFE (Blue 100)
- Background: #FFFFFF (White)
- Surface: #F8FAFC (Slate 50)
- Card: #FFFFFF
- Text Primary: #1E293B (Slate 800)
- Text Secondary: #64748B (Slate 500)
- Border: #E2E8F0 (Slate 200)
- Success: #16A34A (Green 600)
- Warning: #F59E0B (Amber 500)
- Dark Mode BG: #0F172A (Slate 900)
- Dark Mode Surface: #1E293B (Slate 800)
- Dark Mode Text: #F1F5F9 (Slate 100)

### Typography
- Font Stack: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif
- H1: 2rem/700, H2: 1.5rem/600, H3: 1.25rem/600
- Body: 1rem/400, Line-height: 1.75

### Key Component Styles
- Cards: White bg, 1px border slate-200, 8px rounded, subtle shadow
- Buttons: Blue bg, white text, 6px rounded, hover darken
- Navigation: Sticky top, blur backdrop, border-bottom

### Images to Generate
1. **cover-trustworthy-federated-learning.png** - A professional book cover for "可信联邦学习" (Trustworthy Federated Learning), featuring abstract network nodes connected by secure encrypted lines, blue and white color scheme, academic publishing style, clean modern design (Style: minimalist, 3d)

---

## File Structure
```
/workspace/app/frontend/
├── index.html              # 首页
├── contents.html           # 目录页
├── solutions.html          # 习题答案页
├── cite.html               # 引用页
├── feedback.html           # 反馈页
├── acknowledgments.html    # 致谢页
├── 404.html                # 404页
├── assets/
│   ├── css/
│   │   └── styles.css      # 全局样式
│   ├── js/
│   │   ├── main.js         # 全局JS（导航、暗色模式、modal）
│   │   ├── config.js       # 配置加载
│   │   └── solutions.js    # 习题答案页专用
│   ├── site.config.json    # 站点配置
│   ├── images/
│   │   ├── cover.png       # 封面（占位/生成）
│   │   ├── toc-1.png       # 目录截图占位
│   │   ├── toc-2.png
│   │   └── toc-3.png
│   └── pdfs/
│       └── .gitkeep
├── README.md
├── style.css               # (template required, redirect import)
├── script.js               # (template required, redirect import)
└── todo.md
```

## Development Tasks
1. Create site.config.json with all configurable fields
2. Create assets/css/styles.css - complete responsive stylesheet with dark mode
3. Create assets/js/config.js - config loader
4. Create assets/js/main.js - navigation, dark mode, image modal, shared logic
5. Create assets/js/solutions.js - PDF detection logic
6. Create index.html - hero, book intro, authors, cover, purchase, quick links
7. Create contents.html, solutions.html, cite.html, feedback.html, acknowledgments.html, 404.html
8. Create README.md with deployment instructions