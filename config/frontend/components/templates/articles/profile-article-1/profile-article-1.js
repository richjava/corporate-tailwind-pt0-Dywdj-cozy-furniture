import { format } from "date-fns";
import Image from "next/image";
import getConfig from "next/config";
import Link from "next/link";
import { Tag } from "@/elements";

const getHTML = (content) => {
  return {
    __html: content,
  };
};

export default function ProfileArticle1({ content }) {
  if (!content) return <></>;
  let { item } = { ...content };
  const { publicRuntimeConfig } = getConfig();
  return (
    <article id="profile-article-1" className="template">
      {item && (
        <div className="max-w-screen-xl mx-auto">
          <header className="max-w-4xl mx-auto">
            <span className={`preheading blank left`}>
              {item.attributes.position}
            </span>
            <div className="flex items-center">
              <h1 className="mb-10">{item.attributes.fullName}</h1>
            </div>
          </header>
          <div className="relative mb-20">
            <Image
              src={`${publicRuntimeConfig.BACKEND_URL || ""}${
                item.attributes?.profileImage?.data.attributes.url
              }`}
              width={item.attributes.profileImage.data.attributes.width}
              height={item.attributes.profileImage.data.attributes.height}
              layout="responsive"
              alt={item.attributes.fullName}
            />
          </div>
          <div
            className="max-w-2xl mx-auto"
            dangerouslySetInnerHTML={getHTML(item.attributes.bio)}
          ></div>
        </div>
      )}
    </article>
  );
}
