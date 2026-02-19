-- Server - Creates spirits and handles tool giving
-- Place in ServerScriptService as Script

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Debris = game:GetService("Debris")

print("SERVER: Starting...")

-- Create remote for tool giving only
local SignContract = Instance.new("RemoteEvent")
SignContract.Name = "SignContract"
SignContract.Parent = ReplicatedStorage

-- Spirit data
local SpiritData = {
    EmberWisp = {
        name = "Ember Wisp",
        ability = "Fireball",
        damage = 25,
        color = Color3.fromRGB(255, 100, 50)
    },
    FrostShade = {
        name = "Frost Shade",
        ability = "Ice Shard",
        damage = 20,
        color = Color3.fromRGB(100, 180, 255)
    }
}

-- Create spirit model
local function CreateSpirit(spiritKey, position)
    local data = SpiritData[spiritKey]
    print("SERVER: Creating " .. data.name)
    
    -- Model
    local model = Instance.new("Model")
    model.Name = data.name
    
    -- Core
    local core = Instance.new("Part")
    core.Name = "Core"
    core.Shape = Enum.PartType.Ball
    core.Size = Vector3.new(3, 3, 3)
    core.Position = position
    core.Anchored = true
    core.Color = data.color
    core.Material = Enum.Material.Neon
    core.Transparency = 0.2
    core.Parent = model
    
    -- Light
    local light = Instance.new("PointLight")
    light.Color = data.color
    light.Brightness = 3
    light.Range = 20
    light.Parent = core
    
    -- Name tag
    local billboard = Instance.new("BillboardGui")
    billboard.Size = UDim2.new(0, 200, 0, 40)
    billboard.StudsOffset = Vector3.new(0, 3.5, 0)
    billboard.AlwaysOnTop = true
    
    local label = Instance.new("TextLabel")
    label.Size = UDim2.new(1, 0, 1, 0)
    label.BackgroundTransparency = 1
    label.Text = data.name:upper()
    label.TextColor3 = data.color
    label.Font = Enum.Font.GothamBlack
    label.TextSize = 18
    label.TextStrokeTransparency = 0
    label.Parent = billboard
    
    billboard.Parent = core
    
    -- ProximityPrompt - Client will detect this directly!
    local prompt = Instance.new("ProximityPrompt")
    prompt.ActionText = "Sign Contract"
    prompt.ObjectText = data.name
    prompt.HoldDuration = 0.5
    prompt.MaxActivationDistance = 15
    prompt.KeyboardKeyCode = Enum.KeyCode.E
    prompt.Parent = core
    
    -- Animation
    spawn(function()
        local t = 0
        while model.Parent do
            t = t + 0.03
            core.Position = position + Vector3.new(0, math.sin(t * 2) * 0.5, 0)
            wait(0.03)
        end
    end)
    
    model.Parent = workspace
    print("SERVER: " .. data.name .. " ready at " .. tostring(position))
end

-- Handle sign (just gives tool)
SignContract.OnServerEvent:Connect(function(player, spiritKey)
    print("SERVER: " .. player.Name .. " signing " .. tostring(spiritKey))
    
    local data = SpiritData[spiritKey]
    if not data then return end
    
    -- Clear old tools
    for _, tool in pairs(player.Backpack:GetChildren()) do
        if tool:IsA("Tool") then tool:Destroy() end
    end
    
    -- Create tool
    local tool = Instance.new("Tool")
    tool.Name = data.ability
    tool.RequiresHandle = false
    
    tool.Activated:Connect(function()
        local char = player.Character
        if not char then return end
        local hrp = char:FindFirstChild("HumanoidRootPart")
        if not hrp then return end
        
        local proj = Instance.new("Part")
        proj.Size = Vector3.new(1.5, 1.5, 1.5)
        proj.Shape = Enum.PartType.Ball
        proj.Color = data.color
        proj.Material = Enum.Material.Neon
        proj.Position = hrp.Position + hrp.CFrame.LookVector * 3 + Vector3.new(0, 1, 0)
        proj.CanCollide = false
        
        local vel = Instance.new("BodyVelocity")
        vel.Velocity = hrp.CFrame.LookVector * 80
        vel.MaxForce = Vector3.new(99999, 99999, 99999)
        vel.Parent = proj
        
        proj.Parent = workspace
        
        proj.Touched:Connect(function(hit)
            local hum = hit.Parent:FindFirstChild("Humanoid")
            if hum and hit.Parent ~= char then
                hum:TakeDamage(data.damage)
                proj:Destroy()
            elseif not hit:IsDescendantOf(char) then
                proj:Destroy()
            end
        end)
        
        Debris:AddItem(proj, 3)
    end)
    
    tool.Parent = player.Backpack
    
    -- Notify
    local msg = Instance.new("Message")
    msg.Text = "SIGNED: " .. data.name .. "!\nAbility: " .. data.ability
    msg.Parent = player
    Debris:AddItem(msg, 3)
    
    print("SERVER: Gave " .. data.ability .. " to " .. player.Name)
end)

-- Spawn spirits
CreateSpirit("EmberWisp", Vector3.new(0, 6, -15))
CreateSpirit("FrostShade", Vector3.new(15, 6, 0))

print("SERVER: Ready!")