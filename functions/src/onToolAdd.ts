import * as functions from 'firebase-functions/v1'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'
import { EventContext } from 'firebase-functions/v1'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export const onToolAdd = functions.firestore
  .document('tools/{toolId}')
  .onCreate(async (snap: QueryDocumentSnapshot, context: EventContext) => {
    const toolData = snap.data()
    const db = getFirestore()

    if (!toolData?.createdBy || !toolData?.name) {
      console.warn(`Missing required fields in tool document ${context.params.toolId}`)
      return
    }

    const logEntry = {
      type: 'toolAdd',
      toolId: context.params.toolId,
      userId: toolData.createdBy,
      message: `Tool "${toolData.name}" was created.`,
      timestamp: FieldValue.serverTimestamp(),
    }

    try {
      await db.collection('activityLogs').add(logEntry)
      console.log(`Logged tool creation for ${toolData.name}`)
    } catch (error) {
      console.error(`Failed to log tool creation:`, error)
    }
  })
