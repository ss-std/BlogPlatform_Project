import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const blogCategories = ['Perspective', 'Lifestyle', 'Creativity', 'Travel', 'Technology', 'Wellness', 'Culture', 'Food', 'Business']

const seedPosts = [
  { id: 1, title: 'The quiet power of a slower morning', excerpt: 'What happens when we stop rushing into the day and leave room for our best thoughts to arrive?', content: 'There is a particular kind of clarity that only arrives when we stop asking the morning to perform. A cup of coffee, a notebook, and a little unclaimed time can change the shape of an entire day.\n\nThe internet has made speed feel like a virtue. But the work we are proudest of rarely comes from moving fastest. It comes from looking closely, asking better questions, and giving ideas enough space to become themselves.', category: 'Lifestyle', tags: ['Mindfulness', 'Habits'], author: 'Maya Chen', initials: 'MC', date: 'Sep 18, 2024', readTime: '5 min read', image: 'morning', userId: 'maya', coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, title: 'Designing for the in-between', excerpt: 'The most interesting ideas often live between two disciplines. Here is how to find them.', content: 'The best ideas are often hiding in the spaces between familiar categories. A designer who reads poetry sees rhythm in a layout. A developer who studies architecture understands structure differently.\n\nCuriosity is not a distraction from your craft. It is the raw material that makes your craft surprising.', category: 'Creativity', tags: ['Design', 'Ideas'], author: 'Elliot Brooks', initials: 'EB', date: 'Sep 14, 2024', readTime: '7 min read', image: 'design', userId: 'elliot', coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, title: 'Notes from a train window', excerpt: 'A small collection of observations from three weeks moving through the northern coast.', content: 'The landscape changes before you notice that you have changed with it. On a train, the world becomes a sequence of frames: a red barn, a sleeping dog, a child waving from a platform.\n\nTravel does not always need a destination. Sometimes it only asks that you pay attention.', category: 'Travel', tags: ['Journey', 'Places'], author: 'Jon Bell', initials: 'JB', date: 'Sep 08, 2024', readTime: '4 min read', image: 'travel', userId: 'jon', coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, title: 'Make room for better questions', excerpt: 'Before searching for the right answer, take a moment to make sure you are asking the right thing.', content: 'A good question is a form of generosity. It opens a door for someone else, and often for ourselves. The questions we choose shape the conversations we have and the futures we can imagine.', category: 'Perspective', tags: ['Growth', 'Reflection'], author: 'Maya Chen', initials: 'MC', date: 'Aug 29, 2024', readTime: '6 min read', image: 'questions', userId: 'maya', coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, title: 'The joy of collecting tiny rituals', excerpt: 'Small recurring practices can anchor a life that otherwise feels pulled in a dozen directions.', content: 'Rituals often look modest from the outside. A walk after lunch, a weekly reset, a handwritten note before bed. Yet these tiny gestures quietly build a life that feels more livable and more intentional.\n\nThe point is not to become more efficient. It is to become more present.', category: 'Wellness', tags: ['Routine', 'Presence'], author: 'Lina Hart', initials: 'LH', date: 'Aug 18, 2024', readTime: '5 min read', image: 'new', userId: 'lina', coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, title: 'What culture eats for breakfast', excerpt: 'A city tells its story in the way it gathers, cooks, and shares food.', content: 'There is a story hidden in every menu. In the way a neighborhood fills at certain hours, the foods that carry memory, and the rituals people build around them.\n\nA table is one of the simplest ways to understand a place, because it is where people make themselves known to each other.', category: 'Culture', tags: ['Food', 'Community'], author: 'Ari Gomez', initials: 'AG', date: 'Aug 07, 2024', readTime: '8 min read', image: 'travel', userId: 'ari', coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, title: 'A calmer approach to creative work', excerpt: 'Making room for slow feedback loops can sharpen your work more than constant output ever will.', content: 'Creative work is often treated like a sprint. We produce, compare, revise, and start again with more pressure than patience.\n\nBut most interesting work begins to deepen when we stop chasing the feeling of momentum and instead make a habit of thoughtful iteration.', category: 'Business', tags: ['Creativity', 'Focus'], author: 'Maya Chen', initials: 'MC', date: 'Jul 27, 2024', readTime: '6 min read', image: 'design', userId: 'maya', coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, title: 'Finding a better rhythm in a noisy city', excerpt: 'The right pace is often the one that lets you notice the details you were missing.', content: 'A city is full of useful signals if you slow down enough to notice them. The same street can feel different at sunrise compared to dusk. The same routine can shift from draining to grounding with a single change of attention.', category: 'Lifestyle', tags: ['City', 'Balance'], author: 'Nora Vale', initials: 'NV', date: 'Jul 12, 2024', readTime: '4 min read', image: 'morning', userId: 'nora', coverImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80' },
]

const seedComments = {
  1: [{ id: 1, author: 'Sofia Patel', initials: 'SP', text: 'This is exactly the reminder I needed today. The idea of unclaimed time really stayed with me.', date: 'Sep 19, 2024' }],
  2: [{ id: 2, author: 'Maya Chen', initials: 'MC', text: 'The connection between architecture and design is beautiful. Saving this one.', date: 'Sep 15, 2024' }],
  5: [{ id: 3, author: 'Elena Ross', initials: 'ER', text: 'Tiny rituals like this are the ones I keep returning to.', date: 'Aug 20, 2024' }],
}

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback
  } catch {
    return fallback
  }
}

const uid = () => Date.now() + Math.random()

const fileToDataUrl = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.onerror = () => reject(new Error('Could not read file.'))
  reader.readAsDataURL(file)
})

const makeInitials = name => {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return 'IN'
  return parts.slice(0, 2).map(part => part[0].toUpperCase()).join('')
}

const makeUser = (name, email) => ({
  id: (name || email || 'user').toLowerCase().replace(/[^a-z0-9]+/g, ''),
  name: name || 'StoryBloom Reader',
  email: email || 'reader@storybloom.blog',
  initials: makeInitials(name || email || 'StoryBloom Reader'),
  bio: 'I write about the small rituals that make everyday life feel more intentional.',
  location: 'Based in the world',
  profileImage: '',
})

function App() {
  const [posts, setPosts] = useState(() => read('inkwell-posts', seedPosts))
  const [comments, setComments] = useState(() => read('inkwell-comments', seedComments))
  const [user, setUser] = useState(() => read('inkwell-user', null))
  const [page, setPage] = useState('home')
  const [selectedId, setSelectedId] = useState(null)
  const [editing, setEditing] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => localStorage.setItem('inkwell-posts', JSON.stringify(posts)), [posts])
  useEffect(() => localStorage.setItem('inkwell-comments', JSON.stringify(comments)), [comments])
  useEffect(() => user ? localStorage.setItem('inkwell-user', JSON.stringify(user)) : localStorage.removeItem('inkwell-user'), [user])
  useEffect(() => {
    if (notice) {
      const timer = setTimeout(() => setNotice(''), 2800)
      return () => clearTimeout(timer)
    }
  }, [notice])

  const go = (next, id = null) => {
    setPage(next)
    setSelectedId(id)
    setEditing(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openPost = id => go('detail', id)
  const requireAuth = next => user ? go(next) : go('login')

  const savePost = async data => {
    const normalized = {
      ...data,
      tags: Array.isArray(data.tags) ? data.tags : String(data.tags || '').split(',').map(tag => tag.trim()).filter(Boolean),
      excerpt: data.excerpt || (data.content || '').slice(0, 110).trim() + (data.content.length > 110 ? '…' : ''),
    }

    if (editing) {
      setPosts(posts.map(p => p.id === editing ? { ...p, ...normalized, updatedAt: 'Just now' } : p))
      setNotice('Post updated successfully.')
    } else {
      const fresh = {
        ...normalized,
        id: uid(),
        author: user.name,
        initials: user.initials,
        userId: user.id,
        date: 'Just now',
        readTime: '4 min read',
        image: normalized.image || 'new',
        coverImage: normalized.coverImage || normalized.storyPhoto || 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
      }
      setPosts([fresh, ...posts])
      setNotice('Your story is live.')
    }

    go('dashboard')
  }

  const deletePost = id => {
    if (window.confirm('Delete this story permanently?')) {
      setPosts(posts.filter(p => p.id !== id))
      go('dashboard')
      setNotice('Post deleted.')
    }
  }

  const saveComment = (id, text) => {
    setComments({
      ...comments,
      [id]: [...(comments[id] || []), {
        id: uid(),
        author: user.name,
        initials: user.initials,
        text,
        date: 'Just now',
      }],
    })
    setNotice('Comment added.')
  }

  return <div className="app">
    <Header user={user} go={go} requireAuth={requireAuth} logout={() => { setUser(null); go('home'); setNotice('You have been signed out.') }} />
    {notice && <div className="toast">{notice}</div>}
    <main>
      {page === 'home' && <Home posts={posts} openPost={openPost} go={go} />}
      {page === 'blogs' && <Blogs posts={posts} openPost={openPost} />}
      {page === 'detail' && <Detail post={posts.find(p => p.id === selectedId)} comments={comments[selectedId] || []} user={user} go={go} saveComment={saveComment} />}
      {page === 'login' && <Auth mode="login" onAuth={setUser} go={go} />}
      {page === 'register' && <Auth mode="register" onAuth={setUser} go={go} />}
      {page === 'dashboard' && <Dashboard posts={posts.filter(p => p.userId === user?.id)} go={go} edit={p => { setEditing(p.id); go('editor') }} deletePost={deletePost} />}
      {page === 'editor' && <Editor post={editing ? posts.find(p => p.id === editing) : null} savePost={savePost} go={go} categories={blogCategories} />}
      {page === 'profile' && <Profile user={user} posts={posts.filter(p => p.userId === user?.id)} go={go} setUser={setUser} />}
    </main>
    <Footer go={go} />
  </div>
}

function Header({ user, go, requireAuth, logout }) {
  const [open, setOpen] = useState(false)

  return <header className="header"><div className="nav wrap">
    <button className="brand" onClick={() => go('home')}><span className="brand-mark">s</span><span>storybloom</span></button>
    <nav className={open ? 'nav-links open' : 'nav-links'}>
      <button onClick={() => { go('home'); setOpen(false) }}>Home</button>
      <button onClick={() => { go('blogs'); setOpen(false) }}>Explore</button>
      <button onClick={() => { requireAuth('dashboard'); setOpen(false) }}>My stories</button>
      {user && <button onClick={() => { go('profile'); setOpen(false) }}>Profile</button>}
    </nav>
    <div className="nav-actions">
      {user ? <>
        <button className="avatar" onClick={() => go('profile')}>{user.profileImage ? <img src={user.profileImage} alt={user.name} /> : user.initials}</button>
        <button className="text-button hide-mobile" onClick={logout}>Sign out</button>
      </> : <>
        <button className="text-button hide-mobile" onClick={() => go('login')}>Sign in</button>
        <button className="button small hide-mobile" onClick={() => go('register')}>Start writing</button>
      </>}
      <button className="menu" onClick={() => setOpen(!open)}>☰</button>
    </div>
  </div></header>
}

function Home({ posts, openPost, go }) {
  const categories = useMemo(() => ['Lifestyle', 'Creativity', 'Travel', 'Technology', 'Wellness'], [])

  return <>
    <section className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow">A place for thoughtful stories</p>
        <h1>Ideas worth<br /><em>sharing.</em></h1>
        <p className="hero-sub">StoryBloom is a quiet corner of the internet for curious people. Read something new, or make something yours.</p>
        <div className="hero-actions">
          <button className="button" onClick={() => go('blogs')}>Explore stories <span>↗</span></button>
          <button className="button ghost" onClick={() => go('register')}>Start writing</button>
        </div>
      </div>
      <div className="hero-art">
        <div className="sun"></div>
        <div className="art-card card-one"><span>“</span><p>Make space<br />for wonder.</p></div>
        <div className="art-card card-two">✦<small>EST.<br />2024</small></div>
        <div className="scribble">discover more</div>
      </div>
    </section>

    <section className="featured wrap">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Fresh from the community</p>
          <h2>Latest stories</h2>
        </div>
        <button className="link-arrow" onClick={() => go('blogs')}>View all stories <span>→</span></button>
      </div>
      <div className="post-grid">{posts.slice(0, 3).map((p, i) => <PostCard key={p.id} post={p} featured={i === 0} openPost={openPost} />)}</div>
    </section>

    <section className="category-strip wrap">
      <div className="section-heading compact"><div><p className="eyebrow">Explore by mood</p><h2>Popular categories</h2></div></div>
      <div className="category-pills">{categories.map(category => <button key={category} className="pill" onClick={() => go('blogs')}>{category}</button>)}</div>
    </section>

    <section className="manifesto">
      <div className="wrap manifesto-inner">
        <p className="eyebrow">Why StoryBloom?</p>
        <h2>Good ideas deserve<br /><em>a place to land.</em></h2>
        <p>We believe the best stories are not the loudest ones. They are the honest, unexpected, beautifully specific ones.</p>
      </div>
    </section>
  </>
}

function PostCard({ post, featured, openPost }) {
  const coverStyle = post.coverImage ? { backgroundImage: `url(${post.coverImage})` } : {}

  return <article className={featured ? 'post-card featured-card' : 'post-card'} onClick={() => openPost(post.id)}>
    <div className={`post-image ${post.image}`} style={coverStyle}>
      <span className="image-label">{post.category}</span>
      {featured && <div className="image-quote">slow<br /><i>is a</i><br />superpower</div>}
    </div>
    <div className="post-meta"><span>{post.date}</span><span>{post.readTime}</span></div>
    <h3>{post.title}</h3>
    <p>{post.excerpt}</p>
    <div className="author"><span className="mini-avatar">{post.initials}</span><span>By <b>{post.author}</b></span><span className="arrow">↗</span></div>
  </article>
}

function Blogs({ posts, openPost }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const categories = ['All', ...new Set(posts.map(p => p.category))]
  const filtered = posts.filter(p => (category === 'All' || p.category === category) && `${p.title} ${p.excerpt} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))

  return <section className="page wrap">
    <div className="page-intro">
      <p className="eyebrow">The StoryBloom journal</p>
      <h1>Explore <em>stories.</em></h1>
      <p>Ideas, observations, and small discoveries from our community.</p>
    </div>
    <div className="filters">
      <div className="search"><span>⌕</span><input placeholder="Search stories..." value={query} onChange={e => setQuery(e.target.value)} /></div>
      <div className="category-tabs">{categories.map(c => <button className={c === category ? 'active' : ''} key={c} onClick={() => setCategory(c)}>{c}</button>)}</div>
    </div>
    <div className="all-posts">{filtered.map(p => <PostCard key={p.id} post={p} openPost={openPost} />)}</div>
    {!filtered.length && <div className="empty">No stories found. Try a different search.</div>}
  </section>
}

function Detail({ post, comments, user, go, saveComment }) {
  const [text, setText] = useState('')

  if (!post) return <div className="empty page wrap">That story could not be found.</div>

  const submit = e => {
    e.preventDefault()
    if (text.trim()) {
      saveComment(post.id, text.trim())
      setText('')
    }
  }

  const imageStyle = post.coverImage ? { backgroundImage: `url(${post.coverImage})` } : {}

  return <article className="article wrap">
    <button className="back" onClick={() => go('blogs')}>← Back to stories</button>
    <div className={`article-image ${post.image}`} style={imageStyle}><span>{post.category}</span><div>{post.title}</div></div>
    <div className="article-heading">
      <div className="post-meta"><span>{post.date}</span><span>{post.readTime}</span></div>
      <h1>{post.title}</h1>
      <div className="author large"><span className="mini-avatar">{post.initials}</span><span>Written by <b>{post.author}</b></span></div>
    </div>
    <div className="article-body">
      <div className="article-content">
        {post.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
        <div className="tags">{post.tags.map(t => <span key={t}>#{t}</span>)}</div>
      </div>
      <aside><div className="aside-note"><span>✦</span><p>Take your time.<br />There is no rush here.</p></div></aside>
    </div>

    <section className="comments">
      <h2>Conversation <span>{comments.length}</span></h2>
      {comments.map(c => <div className="comment" key={c.id}><span className="mini-avatar">{c.initials}</span><div><div className="comment-top"><b>{c.author}</b><small>{c.date}</small></div><p>{c.text}</p></div></div>)}
      {user ? <form className="comment-form" onSubmit={submit}><span className="mini-avatar">{user.initials}</span><div><textarea placeholder="Share your thoughts..." value={text} onChange={e => setText(e.target.value)} /><button className="button small" type="submit">Post comment</button></div></form> : <div className="login-prompt">Want to join the conversation? <button onClick={() => go('login')}>Sign in</button> to leave a comment.</div>}
    </section>
  </article>
}

function Auth({ mode, onAuth, go }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const submit = e => {
    e.preventDefault()
    if (!form.email || !form.password || (mode === 'register' && !form.name)) return setError('Please fill in all required fields.')

    const name = form.name || form.email.split('@')[0]
    onAuth({
      ...makeUser(name, form.email),
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, ''),
      email: form.email,
    })
    go('home')
  }

  return <section className="auth-page">
    <div className="auth-art"><span className="brand-mark">i</span><h2>Ideas worth<br /><em>sharing.</em></h2><p>A quiet corner for curious minds.</p></div>
    <div className="auth-form">
      <button className="back" onClick={() => go('home')}>← Back home</button>
      <p className="eyebrow">{mode === 'login' ? 'Welcome back' : 'Join the community'}</p>
      <h1>{mode === 'login' ? 'Sign in to StoryBloom' : 'Create your account'}</h1>
      <p className="muted">{mode === 'login' ? 'Continue where you left off.' : 'Start sharing the ideas that matter to you.'}</p>
      <form onSubmit={submit}>
        {mode === 'register' && <label>Your name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Alex Morgan" /></label>}
        <label>Email address<input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
        <label>Password<input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" /></label>
        {error && <div className="form-error">{error}</div>}
        <button className="button full" type="submit">{mode === 'login' ? 'Sign in' : 'Create account'} <span>→</span></button>
      </form>
      <p className="switch">{mode === 'login' ? 'New to StoryBloom?' : 'Already have an account?'} <button onClick={() => go(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create an account' : 'Sign in'}</button></p>
    </div>
  </section>
}

function Dashboard({ posts, go, edit, deletePost }) {
  return <section className="page wrap">
    <div className="dashboard-head">
      <div><p className="eyebrow">Your space</p><h1>My <em>stories.</em></h1></div>
      <button className="button" onClick={() => go('editor')}>+ New story</button>
    </div>
    {posts.length ? <div className="story-list">{posts.map(p => <div className="story-row" key={p.id}><div className="row-thumb" style={p.coverImage ? { backgroundImage: `url(${p.coverImage})` } : {}}></div><div className="row-info"><span className="status">Published</span><h3>{p.title}</h3><p>{p.date} · {p.readTime}</p></div><div className="row-actions"><button onClick={() => go('detail', p.id)}>View</button><button onClick={() => edit(p)}>Edit</button><button className="danger" onClick={() => deletePost(p.id)}>Delete</button></div></div>)}</div> : <div className="empty dashboard-empty"><div>✎</div><h2>Your first story is waiting.</h2><p>Put an idea into words and share it with the community.</p><button className="button" onClick={() => go('editor')}>Write a story</button></div>}
  </section>
}

function Editor({ post, savePost, go, categories }) {
  const [form, setForm] = useState(post || { title: '', category: 'Perspective', tags: '', excerpt: '', content: '', coverImage: '', storyPhoto: '' })

  useEffect(() => {
    if (post) {
      setForm({
        ...post,
        tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '',
      })
    }
  }, [post])

  const update = (key, value) => setForm({ ...form, [key]: value })

  const handleUpload = async (key, file) => {
    if (!file) return
    const dataUrl = await fileToDataUrl(file)
    update(key, dataUrl)
  }

  const submit = async e => {
    e.preventDefault()
    if (form.title && form.content) {
      await savePost({
        ...form,
        image: form.coverImage ? 'custom' : form.image || 'new',
        storyPhoto: form.storyPhoto || form.coverImage,
        coverImage: form.coverImage || 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
      })
    }
  }

  return <section className="editor wrap">
    <button className="back" onClick={() => go('dashboard')}>← Back to my stories</button>
    <div className="editor-head">
      <div><p className="eyebrow">{post ? 'Edit story' : 'New story'}</p><h1>{post ? 'Shape your story.' : 'What will you share?'}</h1></div>
    </div>

    <form onSubmit={submit}>
      <label>Title<input required value={form.title} onChange={e => update('title', e.target.value)} placeholder="A title that invites curiosity" /></label>

      <div className="two-fields">
        <label>Category<select value={form.category} onChange={e => update('category', e.target.value)}>
          {categories.map(category => <option key={category}>{category}</option>)}
        </select></label>
        <label>Tags<input value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags} onChange={e => update('tags', e.target.value)} placeholder="ideas, growth" /></label>
      </div>

      <label>Short description<textarea className="short" value={form.excerpt} onChange={e => update('excerpt', e.target.value)} placeholder="Give readers a reason to keep reading..." /></label>
      <label>Story<textarea className="story-input" required value={form.content} onChange={e => update('content', e.target.value)} placeholder="Begin writing here..." /></label>

      <div className="story-media-grid">
        <div className="upload-box">
          <label>Blog cover photo</label>
          <input className="file-input" type="file" accept="image/*" onChange={e => handleUpload('coverImage', e.target.files?.[0])} />
          {form.coverImage && <div className="upload-preview"><img src={form.coverImage} alt="Cover preview" /></div>}
        </div>

        <div className="upload-box">
          <label>Related blog photo</label>
          <input className="file-input" type="file" accept="image/*" onChange={e => handleUpload('storyPhoto', e.target.files?.[0])} />
          {form.storyPhoto && <div className="upload-preview"><img src={form.storyPhoto} alt="Story photo preview" /></div>}
        </div>
      </div>

      <div className="editor-actions">
        <button type="button" className="button ghost" onClick={() => go('dashboard')}>Cancel</button>
        <button className="button" type="submit">{post ? 'Save changes' : 'Publish story'} <span>→</span></button>
      </div>
    </form>
  </section>
}

function Profile({ user, posts, go, setUser }) {
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    profileImage: user?.profileImage || '',
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        profileImage: user.profileImage || '',
      })
    }
  }, [user])

  if (!user) {
    return <section className="page wrap empty">
      <h2>Sign in to view your profile.</h2>
      <button className="button" onClick={() => go('login')}>Go to sign in</button>
    </section>
  }

  const update = (key, value) => setForm({ ...form, [key]: value })

  const handleFile = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await fileToDataUrl(file)
    update('profileImage', dataUrl)
  }

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      ...form,
      initials: makeInitials(form.name),
      id: (form.name || user.email).toLowerCase().replace(/[^a-z0-9]+/g, ''),
    }
    setUser(updatedUser)
    setIsEditing(false)
  }

  return <section className="page wrap profile-page">
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar large">
          {user.profileImage || form.profileImage ? <img src={form.profileImage || user.profileImage} alt={user.name} /> : user.initials}
        </div>
        <div>
          <p className="eyebrow">Your profile</p>
          <h1>{user.name}</h1>
          <p className="profile-meta-line">{user.location || 'Writer, explorer, storyteller'}</p>
        </div>
      </div>

      {!isEditing ? <>
        <p className="profile-bio">{user.bio || 'Tell the world what you care about and what you love to write about.'}</p>
        <div className="profile-stats">
          <div><b>{posts.length}</b><span>Stories published</span></div>
          <div><b>∞</b><span>Ideas waiting</span></div>
        </div>
        <div className="profile-actions">
          <button className="button ghost" onClick={() => go('editor')}>Write a story</button>
          <button className="button" onClick={() => setIsEditing(true)}>Edit profile</button>
        </div>
      </> : <div className="profile-form">
        <div className="field-row">
          <label>Name<input value={form.name} onChange={e => update('name', e.target.value)} /></label>
          <label>Location<input value={form.location} onChange={e => update('location', e.target.value)} placeholder="Paris, France" /></label>
        </div>
        <label>Bio<textarea value={form.bio} onChange={e => update('bio', e.target.value)} placeholder="Write a short bio..." /></label>
        <div className="upload-box compact">
          <label>Profile photo</label>
          <input className="file-input" type="file" accept="image/*" onChange={handleFile} />
          {form.profileImage && <div className="upload-preview small"><img src={form.profileImage} alt="Profile preview" /></div>}
        </div>
        <div className="profile-actions">
          <button type="button" className="button ghost" onClick={() => setIsEditing(false)}>Cancel</button>
          <button type="button" className="button" onClick={saveProfile}>Save profile</button>
        </div>
      </div>}
    </div>
  </section>
}

function Footer({ go }) {
  return <footer className="site-footer">
    <div className="wrap footer-grid">
      <div className="footer-brand-block">
        <button className="brand" onClick={() => go('home')}><span className="brand-mark">s</span><span>storybloom</span></button>
        <p>For the curious, by the curious.</p>
      </div>

      <div className="footer-about">
        <h3>About StoryBloom</h3>
        <p>StoryBloom is a modern storytelling platform built for writers, readers, and dreamers who want to share ideas, experiences, and thoughtful perspectives with the world.</p>
      </div>

      <div className="footer-company">
        <h3>Company</h3>
        <ul>
          <li>Founded in 2024</li>
          <li>Community-driven publishing</li>
          <li>Writers, editors, and readers worldwide</li>
          <li>Helping voices grow through meaningful stories</li>
        </ul>
      </div>
    </div>

    <div className="wrap footer-inner">
      <span>© 2024 StoryBloom</span>
      <span>hello@storybloom.blog</span>
    </div>
  </footer>
}

createRoot(document.getElementById('root')).render(<App />)
