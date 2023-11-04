// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/about_me`
  | `/categories`
  | `/categories/:category_name`
  | `/sessions`
  | `/sessions/:id`

export type Params = {
  '/categories/:category_name': { category_name: string }
  '/sessions/:id': { id: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
