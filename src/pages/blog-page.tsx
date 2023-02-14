import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function BlogPage () {
    const router = useRouter();
    const { content } = router.query;

    return (
        <div className={'column'}>
            <div>
                <Link href={'/'}>
                    Back
                </Link>
            </div>
            <div>
                <MDXProvider>
                    {content}
                </MDXProvider>
            </div>
        </div>
    );
}

export default BlogPage;