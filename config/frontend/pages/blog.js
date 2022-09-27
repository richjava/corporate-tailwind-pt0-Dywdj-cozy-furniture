import React from "react";
import { getProps } from "@builtjs/site";
import Error from "next/error";
import { withRouter } from "next/router";
import SEO from "@/templates/head/seo/seo";
import List5 from "@/templates/lists/list-5/list-5";
import List4 from "@/templates/lists/list-4/list-4";
import Layout from "@/layout/layout";

const Page = (props) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
     <>
	<SEO content={props.blogSeoContent} />
		<Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <List4 content={props.blogLandingContent} />
			 <List5 content={props.blogItemListContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export async function getStaticProps() {
  let props = await getProps({pageSlug: 'blog'});
  return {
    props: props,
    revalidate: 10
  };
}