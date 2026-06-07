import { getAllProjects, getProjectBySlug, getAdjacentProjects } from '@/lib/projects'

describe('getAllProjects', () => {
  it('returns exactly 4 projects', () => {
    expect(getAllProjects()).toHaveLength(4)
  })

  it('returns projects sorted by order ascending', () => {
    const projects = getAllProjects()
    for (let i = 0; i < projects.length - 1; i++) {
      expect(projects[i].order).toBeLessThan(projects[i + 1].order)
    }
  })

  it('first project is swiftdocpro (featured)', () => {
    expect(getAllProjects()[0].slug).toBe('swiftdocpro')
    expect(getAllProjects()[0].featured).toBe(true)
  })
})

describe('getProjectBySlug', () => {
  it('returns the matching project', () => {
    const p = getProjectBySlug('noctlore')
    expect(p).toBeDefined()
    expect(p?.name).toBe('Noctlore')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('unknown')).toBeUndefined()
  })
})

describe('getAdjacentProjects', () => {
  it('prev is null for the first project', () => {
    expect(getAdjacentProjects('swiftdocpro').prev).toBeNull()
  })

  it('next points to noctlore after swiftdocpro', () => {
    expect(getAdjacentProjects('swiftdocpro').next?.slug).toBe('noctlore')
  })

  it('next is null for the last project', () => {
    expect(getAdjacentProjects('acwdi').next).toBeNull()
  })

  it('returns both prev and next for a middle project', () => {
    const { prev, next } = getAdjacentProjects('noctlore')
    expect(prev?.slug).toBe('swiftdocpro')
    expect(next?.slug).toBe('bodytrack')
  })

  it('returns both null for an unknown slug', () => {
    expect(getAdjacentProjects('invalid')).toEqual({ prev: null, next: null })
  })
})
