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

  it('first project is noctlore (featured)', () => {
    expect(getAllProjects()[0].slug).toBe('noctlore')
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
    expect(getAdjacentProjects('noctlore').prev).toBeNull()
  })

  it('next points to swiftdocpro after noctlore', () => {
    expect(getAdjacentProjects('noctlore').next?.slug).toBe('swiftdocpro')
  })

  it('next is null for the last project', () => {
    expect(getAdjacentProjects('acwdi').next).toBeNull()
  })

  it('returns both prev and next for a middle project', () => {
    const { prev, next } = getAdjacentProjects('swiftdocpro')
    expect(prev?.slug).toBe('noctlore')
    expect(next?.slug).toBe('bodytrack')
  })

  it('returns both null for an unknown slug', () => {
    expect(getAdjacentProjects('invalid')).toEqual({ prev: null, next: null })
  })
})
