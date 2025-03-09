import {
  Configuration,
  AgentsApi,
  type GetMyAgent200Response,
  SystemsApi,
  type GetWaypoint200Response,
  ContractsApi,
  type GetContracts200Response,
  // WaypointTraitSymbol,
  type GetSystemWaypoints200Response,
  FleetApi,
  type GetMyShips200Response,
  type Ship
} from "fizzz-spacetraders-sdk-ts";

class SpaceTradersController {
  private configuration: Configuration;

  constructor() {
    this.configuration = new Configuration({
      accessToken: import.meta.env.VITE_SPACE_TRADERS_TOKEN, // Auth token for the API
      basePath: import.meta.env.VITE_SPACE_TRADERS_API_URL // Base path for the API
    });
  }

  async me(): Promise<GetMyAgent200Response> {
    try {
      const response = await new AgentsApi(this.configuration).getMyAgent();
      return response.data;
    } catch (error) {
      console.log("Error fetching me:", error);
      throw new Error("Data fetch failed");
    }
  }

  async getHeadquartersWaypoint(): Promise<GetWaypoint200Response> {
    try {
      const headquartersLocation = (await this.me()).data.headquarters;
      const split = headquartersLocation.split("-");

      const systemSymbol = `${split[0]}-${split[1]}`;

      const response = await new SystemsApi(this.configuration).getWaypoint(
        systemSymbol,
        headquartersLocation
      );

      return response.data;
    } catch (error) {
      console.log("Error fetching waypoint:", error);
      throw new Error("Data fetch failed");
    }
  }

  async getContracts(): Promise<GetContracts200Response> {
    try {
      const contracts = await new ContractsApi(this.configuration).getContracts();
      return contracts.data;
    } catch (error) {
      console.log("Error fetching contracts:", error);
      throw new Error("Data fetch failed");
    }
  }

  async getShipyardsInSystem(systemSymbol: string): Promise<GetSystemWaypoints200Response> {
    console.log("🚀 ~ SpaceTradersController ~ getShipyardsInSystem ~ systemSymbol:", systemSymbol);
    try {
      const shipyards = await new SystemsApi(this.configuration).getSystemWaypoints(
        systemSymbol,
        undefined,
        undefined,
        undefined,
        ["SHIPYARD"]
      );
      return shipyards.data;
    } catch (error) {
      console.log("Error fetching shipyards:", error);
      throw new Error("Data fetch failed");
    }
  }

  async getMyShips(): Promise<Ship[]> {
    const ships = await new FleetApi(this.configuration).getMyShips();
    return ships.data.data;
  }
}

export const spaceTradersController = new SpaceTradersController();
