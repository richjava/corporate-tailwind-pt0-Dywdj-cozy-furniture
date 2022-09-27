import React from "react";
import { getProps } from "@builtjs/site";
import Error from "next/error";
import { withRouter } from "next/router";
import SEO from "@/templates/head/seo/seo";
import ProfileCards1 from "@/templates/cards/profile-cards-1/profile-cards-1";
import Cover2 from "@/templates/covers/cover-2/cover-2";
import Layout from "@/layout/layout";

const Page = (props) => {
  if (props.error) {
    return <Error statusCode={props.error.code} />
  }
  return (
     <>
	<SEO content={props.aboutSeoContent} />
		<Layout headerContent={props.headerContent}  footerContent={props.footerContent} >
			 <Cover2 content={props.aboutLandingContent} />
			 <ProfileCards1 content={props.teamContent} />
			</Layout>
		</>
  );
};

export default withRouter(Page);

export async function getStaticProps() {
  let props = await getProps({pageSlug: 'about'});
  return {
    props: props,
    revalidate: 10
  };
}