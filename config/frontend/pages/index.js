import React from "react";
import { getProps } from "@builtjs/site";
import Error from "next/error";
import { withRouter } from "next/router";
import SEO from "@/templates/head/seo/seo";
import Block1 from "@/templates/blocks/block-1/block-1";
import List1 from "@/templates/lists/list-1/list-1";
import Cards1 from "@/templates/cards/cards-1/cards-1";
import Cover1 from "@/templates/covers/cover-1/cover-1";
import Layout from "@/layout/layout";

const Page = (props) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
     <>
	<SEO content={props.homeSeoContent} />
		<Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <Cover1 content={props.mainLandingContent} />
			 <Cards1 content={props.featuresListContent} />
			 <List1 content={props.benefitsListContent} />
			 <Block1 content={props.aboutTeaserContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export async function getStaticProps() {
  let props = await getProps({pageSlug: 'home'});
  return {
    props: props,
    revalidate: 10
  };
}