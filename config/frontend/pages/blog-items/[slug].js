import React from "react";
import { getProps, getPaths } from "@builtjs/site";
import Error from "next/error";
import { withRouter } from "next/router";
import List5 from "@/templates/lists/list-5/list-5";
import Article1 from "@/templates/articles/article-1/article-1";
import Layout from "@/layout/layout";

const Page = (props) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
    <><Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <Article1 content={props.blogArticleContent} />
			 <List5 content={props.blogRelatedArticlesContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export async function getStaticProps({ params }) {
  let props = await getProps({
    pageSlug: 'blog-article',
    collectionSlug: "blog-items",
    articleSlug: params.slug, 
  });
  return {
    props: props,
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const allItems = await getPaths('blog-items');
  return {
    paths: allItems?.collection.map(({ attributes }) => "/blog-items/" + attributes.slug) ?? [],
    fallback: true
  };
}