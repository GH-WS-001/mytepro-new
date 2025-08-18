# Sanity CMS 内容管理系统配置指南

## 概述

本项目集成了 Sanity CMS 作为内容管理系统，支持多语言内容管理，包括文章、案例、FAQ等内容类型。

## 1. Sanity 项目初始化

### 1.1 注册 Sanity 账号

1. 访问 [Sanity.io](https://www.sanity.io/) 并注册账号
2. 安装 Sanity CLI：
   ```bash
   npm install -g @sanity/cli
   ```
3. 登录 Sanity：
   ```bash
   sanity login
   ```

### 1.2 创建新项目

```bash
# 在项目根目录创建 sanity 子项目
mkdir sanity
cd sanity

# 初始化 Sanity 项目
sanity init
```

按照提示选择：
- Project name: `mytepro-cms`
- Dataset: `production`
- Project template: 选择 `Clean project with no predefined schemas`

### 1.3 配置内容模型

在 `sanity/schemas` 目录下创建以下 schema 文件：

#### post.js (文章)
```javascript
export default {
  name: 'post',
  title: '文章',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '标题',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL 别名',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3
    },
    {
      name: 'mainImage',
      title: '主图',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime'
    },
    {
      name: 'author',
      title: '作者',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'categories',
      title: '分类',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }]
    },
    {
      name: 'body',
      title: '正文',
      type: 'blockContent'
    }
  ]
}
```

#### case.js (案例)
```javascript
export default {
  name: 'case',
  title: '案例',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '标题',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL 别名',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: '摘要',
      type: 'text',
      rows: 3
    },
    {
      name: 'mainImage',
      title: '主图',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'featured',
      title: '精选案例',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'publishedAt',
      title: '发布时间',
      type: 'datetime'
    },
    {
      name: 'client',
      title: '客户',
      type: 'string'
    },
    {
      name: 'technologies',
      title: '技术栈',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'challenge',
      title: '挑战',
      type: 'blockContent'
    },
    {
      name: 'solution',
      title: '解决方案',
      type: 'blockContent'
    },
    {
      name: 'results',
      title: '成果',
      type: 'blockContent'
    }
  ]
}
```

#### faq.js (常见问题)
```javascript
export default {
  name: 'faq',
  title: '常见问题',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: '问题',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: '答案',
      type: 'blockContent',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: [
          { title: '产品相关', value: '产品相关' },
          { title: '技术支持', value: '技术支持' },
          { title: '价格咨询', value: '价格咨询' },
          { title: '其他', value: '其他' }
        ]
      }
    },
    {
      name: 'order',
      title: '排序',
      type: 'number'
    }
  ]
}
```

#### siteSettings.js (站点设置)
```javascript
export default {
  name: 'siteSettings',
  title: '站点设置',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: '网站标题',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'siteDescription',
      title: '网站描述',
      type: 'text'
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image'
    },
    {
      name: 'favicon',
      title: '网站图标',
      type: 'image'
    },
    {
      name: 'socialLinks',
      title: '社交媒体链接',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: '平台', type: 'string' },
            { name: 'url', title: '链接', type: 'url' }
          ]
        }
      ]
    },
    {
      name: 'contactInfo',
      title: '联系信息',
      type: 'object',
      fields: [
        { name: 'email', title: '邮箱', type: 'string' },
        { name: 'phone', title: '电话', type: 'string' },
        { name: 'address', title: '地址', type: 'text' }
      ]
    }
  ]
}
```

### 1.4 部署 Sanity Studio

```bash
# 在 sanity 目录下
sanity deploy
```

## 2. 环境配置

### 2.1 获取项目信息

1. 登录 [Sanity Manage](https://www.sanity.io/manage)
2. 找到你的项目，记录以下信息：
   - Project ID
   - Dataset 名称
   - API Token（在 Settings -> API 中生成）

### 2.2 配置环境变量

在项目根目录的 `.env.local` 文件中添加：

```env
# Sanity CMS 配置
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

## 3. 内容管理流程

### 3.1 内容创建

1. 访问部署的 Sanity Studio
2. 选择对应的内容类型
3. 填写内容并保存
4. 点击 "Publish" 发布内容

### 3.2 内容编辑

1. 在 Sanity Studio 中找到要编辑的内容
2. 点击 "Edit" 进行修改
3. 保存并重新发布

### 3.3 内容删除

1. 在 Sanity Studio 中找到要删除的内容
2. 点击 "Delete" 确认删除

### 3.4 多语言支持

目前项目支持中文内容，如需添加多语言支持：

1. 在 schema 中添加语言字段
2. 修改前端查询逻辑
3. 更新国际化配置

## 4. 前端集成

### 4.1 数据获取

项目已封装了以下 hooks：

```typescript
// 获取所有文章
const { data: posts, loading, error } = usePosts();

// 获取单篇文章
const { data: post, loading, error } = usePost(slug);

// 获取所有案例
const { data: cases, loading, error } = useCases();

// 获取单个案例
const { data: case_item, loading, error } = useCase(slug);

// 获取FAQ
const { data: faqs, loading, error } = useFAQs();

// 获取站点设置
const { data: settings, loading, error } = useSiteSettings();
```

### 4.2 内容渲染

使用 `PortableTextRenderer` 组件渲染富文本内容：

```typescript
import { PortableTextRenderer } from '@/components/SanityContent';

// 在组件中使用
<PortableTextRenderer value={content.body} />
```

### 4.3 图片处理

使用 `urlFor` 函数处理图片：

```typescript
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

<Image
  src={urlFor(post.mainImage).width(400).height(200).url()}
  alt={post.title}
  width={400}
  height={200}
/>
```

## 5. 预览功能（可选）

### 5.1 配置预览

1. 在 Sanity Studio 中安装 `@sanity/preview-kit`:
   ```bash
   cd sanity
   npm install @sanity/preview-kit
   ```

2. 配置预览 URL

### 5.2 使用预览

在前端页面中添加预览模式支持：

```typescript
import { previewClient } from '@/lib/sanity';
import { usePreview } from '@/lib/sanity/preview';

export default function PostPage({ data, preview }) {
  const { data: previewData } = usePreview(data, preview);
  const postData = previewData || data;
  
  return (
    <article>
      <h1>{postData.title}</h1>
      <PortableTextRenderer value={postData.body} />
    </article>
  );
}
```

## 6. 最佳实践

### 6.1 性能优化

- 使用 CDN 加速图片加载
- 合理设置图片尺寸
- 使用分页加载大量内容
- 启用 Sanity 的 CDN

### 6.2 安全考虑

- 不要在前端暴露 API Token
- 使用环境变量管理敏感信息
- 定期更新 API Token
- 限制内容编辑权限

### 6.3 内容策略

- 制定内容发布流程
- 设置内容审核机制
- 定期备份重要内容
- 建立内容更新计划

## 7. 故障排除

### 7.1 常见问题

**Q: 无法连接到 Sanity API**
A: 检查环境变量配置和网络连接

**Q: 图片无法显示**
A: 确认图片已正确上传并检查 `urlFor` 函数使用

**Q: 内容更新后前端未刷新**
A: 检查 Sanity 的 CDN 缓存设置

### 7.2 调试工具

- 使用 Sanity Vision 进行查询测试
- 检查浏览器控制台错误
- 使用 React DevTools 检查组件状态

## 8. 扩展功能

### 8.1 搜索功能

集成 Sanity 的搜索功能：

```typescript
// 搜索文章
export async function searchPosts(query: string) {
  return await sanityClient.fetch(
    `*[_type == "post" && (title match "${query}" || excerpt match "${query}")] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt
    }`
  );
}
```

### 8.2 评论系统

集成第三方评论系统或开发自定义评论功能

### 8.3 分析集成

集成 Google Analytics 或其他分析工具

---

如需更多帮助，请参考 [Sanity 官方文档](https://www.sanity.io/docs) 或联系开发团队。