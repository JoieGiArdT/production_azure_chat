"use strict";
/* import { v4 } from 'uuid'
import 'dotenv/config'
import dialogflow from '@google-cloud/dialogflow'
import { SessionsClient } from '@google-cloud/dialogflow/build/src/v2'
import { google } from '@google-cloud/dialogflow/build/protos/protos'
// import { Request } from 'express'

class DialogFlowService {
  private readonly projectId: string = process.env.GOOGLE_PROJECT_ID as string
  private readonly credentials = {
    private_key: process.env.GOOGLE_PRIVATE_KEY as string,
    client_email: process.env.GOOGLE_CLIENT_EMAIL as string
  }

  private readonly sessionClient: SessionsClient
  constructor () {
    this.sessionClient = new dialogflow.SessionsClient({ credentials: this.credentials })
  }

  public async sendMessage (message: string): void {
    const newSessionId = v4()
    const sessionPath = this.sessionClient.projectAgentSessionPath(this.projectId, newSessionId)
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: String(process.env.DF_LANGUAGE_CODE)
        }
      }
    }

    try {
      const response = await this.sessionClient.detectIntent(request)
      const result = response[0].queryResult
      // console.log("INTENT EMPAREJADO: ", result.intent.displayName);
      const defaultResponses: google.cloud.dialogflow.v2.Intent.IMessage[] = []
      if (result!.action !== 'input.unknown') {
        result!.fulfillmentMessages!.forEach((element) => {
          defaultResponses.push(element)
        })
      }
      if (defaultResponses.length === 0) {
        result!.fulfillmentMessages!.forEach((element) => {
          if (element.platform === 'PLATFORM_UNSPECIFIED') {
            defaultResponses.push(element)
          }
        })
      }
      result!.fulfillmentMessages = defaultResponses
      JSON.stringify(result, null, ' ')
      console.log('se enviara el resultado: ', result!.fulfillmentText)
      // messagingProcesses.SendMessage(result["fulfillmentText"],number);
    } catch (e) {
      console.log('error')
      console.log(e)
    }
  }

  /* const result = responses[0].queryResult;
    // console.log("INTENT EMPAREJADO: ", result.intent.displayName);
    let defaultResponses = [];
    if (result.action !== "input.unknown") {
      result.fulfillmentMessages.forEach((element) => {
        defaultResponses.push(element);
      });
    }
    if (defaultResponses.length === 0) {
      result.fulfillmentMessages.forEach((element) => {
        if (element.platform === "PLATFORM_UNSPECIFIED") {
          defaultResponses.push(element);
        }
      });
    }
    result.fulfillmentMessages = defaultResponses;
    JSON.stringify(result, null, " ");
    //console.log("se enviara el resultado: ", result["fulfillmentText"]);
    //messagingProcesses.SendMessage(result["fulfillmentText"],number);
  } catch (e) {
    console.log("error");
    console.log(e);
  }
}
}
 */
