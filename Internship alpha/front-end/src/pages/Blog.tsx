import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Understanding Heart Disease Risk Factors',
    excerpt: 'Learn about the key risk factors that contribute to heart disease and how to identify them early.',
    date: 'March 15, 2024',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    category: 'Health Education'
  },
  {
    id: '2',
    title: 'The Role of AI in Heart Disease Prevention',
    excerpt: 'Discover how artificial intelligence is revolutionizing the way we predict and prevent heart disease.',
    date: 'March 12, 2024',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80',
    category: 'Technology'
  },
  {
    id: '3',
    title: 'Lifestyle Changes for a Healthy Heart',
    excerpt: 'Simple but effective lifestyle modifications that can significantly reduce your risk of heart disease.',
    date: 'March 10, 2024',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80',
    category: 'Lifestyle'
  },
  {
    id: '4',
    title: 'Latest Research in Cardiovascular Health',
    excerpt: 'Stay updated with the most recent findings and breakthroughs in cardiovascular health research.',
    date: 'March 8, 2024',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80',
    category: 'Research'
  }
];

export const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">HeartGuard Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Stay informed with the latest insights on heart health and medical technology.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col"
          >
            <div className="relative h-48">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <Link
                  to={`/blog/${post.id}`}
                  className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-500"
                >
                  Read more
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Want to contribute to our blog?{' '}
          <a href="mailto:blog@heartguard.com" className="text-primary-600 hover:text-primary-500">
            Contact our editorial team
          </a>
        </p>
      </div>
    </div>
  );
}; 