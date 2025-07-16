/*
  # Create portfolio database schema

  1. New Tables
    - `personal_info`
      - `id` (uuid, primary key)
      - `name` (text)
      - `title` (text)
      - `description` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `resume_url` (text)
      - `github` (text)
      - `linkedin` (text)
      - `twitter` (text)
      - `website` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image` (text)
      - `tags` (text array)
      - `github` (text)
      - `demo` (text)
      - `date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `skills`
      - `id` (uuid, primary key)
      - `name` (text)
      - `level` (integer)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `image` (text)
      - `tags` (text array)
      - `date` (date)
      - `read_time` (text)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

-- Personal Info Table
CREATE TABLE IF NOT EXISTS personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Your Name',
  title text NOT NULL DEFAULT 'AI/ML Developer',
  description text NOT NULL DEFAULT 'Building intelligent systems and sharing knowledge through code.',
  email text NOT NULL DEFAULT 'your.email@example.com',
  phone text NOT NULL DEFAULT '+1 (555) 123-4567',
  location text NOT NULL DEFAULT 'San Francisco, CA',
  resume_url text NOT NULL DEFAULT '#',
  github text NOT NULL DEFAULT 'https://github.com/yourusername',
  linkedin text NOT NULL DEFAULT 'https://linkedin.com/in/yourusername',
  twitter text NOT NULL DEFAULT 'https://twitter.com/yourusername',
  website text NOT NULL DEFAULT 'https://yourwebsite.com',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  github text NOT NULL DEFAULT '',
  demo text NOT NULL DEFAULT '',
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  level integer NOT NULL DEFAULT 50,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image text NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  date date NOT NULL DEFAULT CURRENT_DATE,
  read_time text NOT NULL DEFAULT '5 min read',
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Personal info is publicly readable"
  ON personal_info
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Projects are publicly readable"
  ON projects
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Skills are publicly readable"
  ON skills
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Published blog posts are publicly readable"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (published = true);

-- Create policies for authenticated admin access
CREATE POLICY "Admin can manage personal info"
  ON personal_info
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can manage skills"
  ON skills
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default personal info
INSERT INTO personal_info (id) VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Insert sample data
INSERT INTO projects (title, description, image, tags, github, demo, date) VALUES
('AI-Powered Image Classifier', 'Deep learning model for image classification using TensorFlow and React frontend.', 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Python', 'TensorFlow', 'React', 'Flask'], 'https://github.com/yourusername/project1', 'https://demo.example.com', '2024-01-15'),
('Natural Language Processing Tool', 'NLP toolkit for sentiment analysis and text processing with real-time results.', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Python', 'NLTK', 'FastAPI', 'Vue.js'], 'https://github.com/yourusername/project2', 'https://demo2.example.com', '2024-02-20'),
('Machine Learning Dashboard', 'Interactive dashboard for ML model monitoring and data visualization.', 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['Python', 'Plotly', 'Streamlit', 'Pandas'], 'https://github.com/yourusername/project3', 'https://demo3.example.com', '2024-03-10');

INSERT INTO skills (name, level, category) VALUES
('Python', 95, 'programming'),
('JavaScript', 88, 'programming'),
('TypeScript', 85, 'programming'),
('TensorFlow', 92, 'ai-ml'),
('PyTorch', 90, 'ai-ml'),
('React', 90, 'web'),
('Next.js', 85, 'web'),
('PostgreSQL', 85, 'database'),
('MongoDB', 80, 'database'),
('AWS', 85, 'cloud'),
('Docker', 90, 'cloud');

INSERT INTO blog_posts (title, excerpt, content, image, tags, date, read_time, published) VALUES
('Getting Started with TensorFlow 2.0', 'A comprehensive guide to building your first neural network with TensorFlow 2.0 and best practices.', '# Getting Started with TensorFlow 2.0

TensorFlow 2.0 represents a significant evolution in the TensorFlow ecosystem, making it more accessible and easier to use for both beginners and experts.

## Key Features

- **Eager Execution**: Operations are executed immediately as they''re called
- **Keras Integration**: High-level API for building neural networks
- **Improved Documentation**: Better examples and tutorials

## Your First Neural Network

```python
import tensorflow as tf
from tensorflow import keras

# Define the model
model = keras.Sequential([
    keras.layers.Dense(128, activation=''relu'', input_shape=(784,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation=''softmax'')
])

# Compile the model
model.compile(optimizer=''adam'',
              loss=''sparse_categorical_crossentropy'',
              metrics=[''accuracy''])
```

This simple example shows how to create a neural network for image classification.', 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['TensorFlow', 'Deep Learning', 'Python'], '2024-01-15', '8 min read', true),
('Understanding Transformer Architecture', 'Deep dive into the attention mechanism and how transformers revolutionized NLP.', '# Understanding Transformer Architecture

Transformers have revolutionized natural language processing and are now being applied to computer vision and other domains.

## The Attention Mechanism

The core innovation of transformers is the attention mechanism, which allows the model to focus on relevant parts of the input sequence.

```python
import torch
import torch.nn as nn

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        
    def forward(self, query, key, value):
        # Implementation details...
        pass
```

This implementation shows the core components of multi-head attention.', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400', ARRAY['NLP', 'Transformers', 'Attention'], '2024-02-20', '12 min read', true);