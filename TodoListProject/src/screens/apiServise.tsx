interface ApiConfig {
  method: string;
  headers?: {[key: string]: string};
  body?: string;
}
interface Item {
  id: number;
  item: string;
}

class ApiService
{
    private baseUrl: string;

    constructor(baseUrl: string)
    {
        this.baseUrl = baseUrl;
    }

    private async fetchData(endpoint: string, config: ApiConfig): Promise<any>
    {
        try
        {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, config);
            const result = await response.json();
            return result;
        }
        catch(error)
        {
            console.error(`Error when retrieving data from ${endpoint}:`, error);
            throw error;
        }
    }

    public async getAllItems(): Promise<Item[]>
    {
        const config: ApiConfig =
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
        };

        return this.fetchData('getAllItems', config);
    }

    public async deleteItem(id: number): Promise<void>
    {
        const config: ApiConfig =
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([id,]),
        };

        await this.fetchData('deleteItem', config);
    }

    public async addItem(item: string): Promise<void>
    {
        const config: ApiConfig =
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([ item, ]),
        };

        await this.fetchData('addItem', config);
    }

    public async changeItemText(id: number, newContent: string): Promise<void>
    {
        const config: ApiConfig =
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([ id, newContent,]),
        };

        await this.fetchData('setItem', config);
    }
}

export default ApiService;
