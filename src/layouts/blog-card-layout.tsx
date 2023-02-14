import styles from '@/styles/Home.module.css'

type blogCardLayoutProps = {

    children: React.ReactNode;

}

function BlogCardLayout ({children}: blogCardLayoutProps) {
    return (
        <div>
            {children}
        </div>
    );
}

export default BlogCardLayout;