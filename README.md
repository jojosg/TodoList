# 📁 프로젝트 소개
TodoList는 할 일을 효율적으로 관리할 수 있는 서비스를 제공합니다. 사용자는 할 일을 추가하고, 완료 여부를 체크하며, 상세 페이지에서 메모와 이미지를 첨부하여 더욱 풍부한 정보를 기록할 수 있습니다. 또한 완료된 항목을 시각적으로 구분하여 일정 관리의 편의성을 높였습니다.

# 📁 주요 기능

### ✅ 홈
- 진행 중인 할 일과 완료된 할 일을 나누어 볼 수 있습니다.
- 상단 입력창에 할 일 텍스트를 입력하고 추가하기 버튼을 클릭하거나 엔터를 치면 할 일을 새로 생성합니다.
- 진행 중 할 일 항목의 왼쪽 버튼을 클릭하면 체크 표시가 되면서 완료 상태가 됩니다.
- 완료된 할 일 항목의 왼쪽 버튼을 다시 클릭하면 체크 표시가 사라지면서 진행 중 상태가 됩니다.
![홈페이지1](https://github.com/user-attachments/assets/8ba9337a-16cc-414d-94d2-8d87762b91eb)

### ✅ 상세 페이지
- 할 일 항목을 클릭한 후 항목 수정이 가능합니다.
- 항목 이름을 수정할 수 있습니다.

![상세페이지1](https://github.com/user-attachments/assets/2212ad77-7e70-40f3-adfb-8497dbe7bc93)


### ✅ 상세 페이지
- 할 일 상태(진행/완료)를 수정할 수 있습니다.
- 메모를 추가할 수 있습니다.

![상세페이지2](https://github.com/user-attachments/assets/2ba89d1b-32d6-41c3-906c-2cdd7a885bf8)


### ✅ 상세 페이지
- 이미지(최대 1개)를 첨부할 수 있습니다.
- 이미지 파일 이름은 영어로만 이루어져야 합니다.
- 파일 크기는 5MB 이하여야 합니다.

![상세페이지3](https://github.com/user-attachments/assets/150443f4-5e16-4aaf-a404-113ef23becad)


### ✅ 상세 페이지
- `수정 완료` 버튼을 클릭하면 수정 사항이 반영되고, 할 일 목록 페이지로 이동합니다.
- `삭제하기` 버튼을 클릭하면 할 일 삭제가 가능하며, 삭제 후 할 일 목록 페이지로 이동합니다.

![상세페이지4](https://github.com/user-attachments/assets/6edcc0c2-026c-41f0-a463-77e96c4d930a)


# ✨ 기술 스택
<div>
<img src="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Zustand-E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" />
  </div>




## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
