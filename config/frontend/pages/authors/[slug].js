import React from "react";
import { getProps, getPaths } from "@builtjs/site";
import Error from "next/error";
import { withRouter } from "next/router";
import ProfileArticle1 from "@/templates/articles/profile-article-1/profile-article-1";
import Layout from "@/layout/layout";

const Page = (props) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
    <><Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <ProfileArticle1 content={props.authorArticleContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export async function getStaticProps({ params }) {
  let props = await getProps({
    pageSlug: 'author-article',
    collectionSlug: "authors",
    articleSlug: params.slug, 
  });
  return {
    props: props,
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const allItems = await getPaths('authors');
  return {
    paths: allItems?.collection.map(({ attributes }) => "/authors/" + attributes.slug) ?? [],
    fallback: true
  };
}