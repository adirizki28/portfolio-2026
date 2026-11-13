import project1Img from '../assets/images/project-1.png';
import project2Img from '../assets/images/project-2.png';
import project3Img from '../assets/images/project-3.png';

// Import gambar proyek lainnya di sini, atau gunakan URL string jika sudah dari Dashboard/Cloud

export interface Project {
  image_url?: string;
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'Nama Project Pertama',
    category: 'UI/UX Design',
    image: project1Img,
    link: '#',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Nama Project Pertama',
    category: 'UI/UX Design',
    image: project2Img,
    link: '#',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Nama Project Pertama',
    category: 'UI/UX Design',
    image: project3Img,
    link: '#',
    featured: true,
  },
  // Tinggal tambah item baru di sini
];