-- WORKING Spirit Contract - Based on proven code
-- Place in StarterPlayerScripts as LocalScript

local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

print("CLIENT: Starting...")

-- Create UI in StarterGui style
local gui = Instance.new("ScreenGui")
gui.Name = "ContractGUI"
gui.ResetOnSpawn = false
gui.Parent = playerGui

-- Main frame
local frame = Instance.new("Frame")
frame.Name = "ContractFrame"
frame.Size = UDim2.new(0, 350, 0, 400)
frame.Position = UDim2.new(0.5, -175, 0.5, -200)
frame.BackgroundColor3 = Color3.fromRGB(25, 25, 30)
frame.BorderSizePixel = 0
frame.Visible = false
frame.Parent = gui

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 12)
corner.Parent = frame

-- Title
local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, 0, 0, 50)
title.Position = UDim2.new(0, 0, 0, 15)
title.BackgroundTransparency = 1
title.Text = "SPIRIT CONTRACT"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.Font = Enum.Font.GothamBlack
title.TextSize = 28
title.Parent = frame

-- Spirit name
local nameLabel = Instance.new("TextLabel")
nameLabel.Name = "SpiritName"
nameLabel.Size = UDim2.new(1, 0, 0, 35)
nameLabel.Position = UDim2.new(0, 0, 0, 65)
nameLabel.BackgroundTransparency = 1
nameLabel.Text = "SPIRIT"
nameLabel.TextColor3 = Color3.fromRGB(255, 100, 50)
nameLabel.Font = Enum.Font.GothamBold
nameLabel.TextSize = 24
nameLabel.Parent = frame

-- Description box
local descBox = Instance.new("Frame")
descBox.Size = UDim2.new(1, -30, 0, 200)
descBox.Position = UDim2.new(0, 15, 0, 110)
descBox.BackgroundColor3 = Color3.fromRGB(35, 35, 40)
descBox.BorderSizePixel = 0
descBox.Parent = frame

local descCorner = Instance.new("UICorner")
descCorner.CornerRadius = UDim.new(0, 8)
descCorner.Parent = descBox

-- Description text
local descText = Instance.new("TextLabel")
descText.Name = "Description"
descText.Size = UDim2.new(1, -20, 1, -20)
descText.Position = UDim2.new(0, 10, 0, 10)
descText.BackgroundTransparency = 1
descText.Text = "Spirit description..."
descText.TextColor3 = Color3.fromRGB(220, 220, 220)
descText.Font = Enum.Font.Gotham
descText.TextSize = 14
descText.TextWrapped = true
descText.TextXAlignment = Enum.TextXAlignment.Left
descText.TextYAlignment = Enum.TextYAlignment.Top
descText.Parent = descBox

-- Sign button
local signBtn = Instance.new("TextButton")
signBtn.Name = "SignButton"
signBtn.Size = UDim2.new(0, 140, 0, 45)
signBtn.Position = UDim2.new(0.5, -150, 1, -65)
signBtn.BackgroundColor3 = Color3.fromRGB(0, 200, 100)
signBtn.Text = "SIGN CONTRACT"
signBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
signBtn.Font = Enum.Font.GothamBlack
signBtn.TextSize = 16
signBtn.Parent = frame

local signCorner = Instance.new("UICorner")
signCorner.CornerRadius = UDim.new(0, 10)
signCorner.Parent = signBtn

-- Decline button
local declineBtn = Instance.new("TextButton")
declineBtn.Name = "DeclineButton"
declineBtn.Size = UDim2.new(0, 140, 0, 45)
declineBtn.Position = UDim2.new(0.5, 10, 1, -65)
declineBtn.BackgroundColor3 = Color3.fromRGB(200, 50, 50)
declineBtn.Text = "DECLINE"
declineBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
declineBtn.Font = Enum.Font.GothamBold
declineBtn.TextSize = 16
declineBtn.Parent = frame

local declineCorner = Instance.new("UICorner")
declineCorner.CornerRadius = UDim.new(0, 10)
declineCorner.Parent = declineBtn

print("CLIENT: UI created")

-- Spirit data (same as server)
local SpiritData = {
    EmberWisp = {
        name = "Ember Wisp",
        description = "A volatile spirit born from volcanic ash.\n\nSTRENGTH: Burn damage over time\n\nDRAWBACK: Take 20% more water damage\n\nABILITY: Fireball (25 DMG)",
        color = Color3.fromRGB(255, 100, 50)
    },
    FrostShade = {
        name = "Frost Shade",
        description = "A spirit of frozen wastelands.\n\nSTRENGTH: Slow enemies by 40%\n\nDRAWBACK: Move 15% slower\n\nABILITY: Ice Shard (20 DMG)",
        color = Color3.fromRGB(100, 180, 255)
    }
}

-- Function to show contract
local function ShowContract(spiritKey)
    print("CLIENT: Showing contract for " .. spiritKey)
    
    local data = SpiritData[spiritKey]
    if not data then
        print("CLIENT: No data for " .. spiritKey)
        return
    end
    
    -- Update UI
    nameLabel.Text = data.name:upper()
    descText.Text = data.description
    nameLabel.TextColor3 = data.color
    signBtn.BackgroundColor3 = data.color
    
    -- Show
    frame.Visible = true
    
    print("CLIENT: UI VISIBLE for " .. data.name)
end

-- Function to hide
local function HideContract()
    frame.Visible = false
end

-- CRITICAL: Connect to prompts directly (NO RemoteEvent needed for GUI!)
-- Wait for workspace spirits
local function ConnectPrompts()
    print("CLIENT: Connecting to prompts...")
    
    for spiritKey, data in pairs(SpiritData) do
        -- Find the spirit part
        local spiritModel = workspace:FindFirstChild(data.name)
        if spiritModel then
            local core = spiritModel:FindFirstChild("Core")
            if core then
                local prompt = core:FindFirstChild("ProximityPrompt")
                if prompt then
                    print("CLIENT: Found prompt for " .. data.name)
                    
                    -- THIS IS THE KEY: LocalScript can detect prompt directly!
                    prompt.Triggered:Connect(function()
                        print("CLIENT: Prompt triggered for " .. spiritKey)
                        ShowContract(spiritKey)
                    end)
                else
                    print("CLIENT: No prompt found for " .. data.name)
                end
            end
        else
            print("CLIENT: Spirit not found: " .. data.name)
        end
    end
end

-- Wait a moment for server to create spirits
wait(2)
ConnectPrompts()

-- Button handlers
signBtn.MouseButton1Click:Connect(function()
    print("CLIENT: Sign clicked")
    -- Fire to server to give tool
    local ReplicatedStorage = game:GetService("ReplicatedStorage")
    local SignContract = ReplicatedStorage:WaitForChild("SignContract")
    
    -- Get current spirit from visible UI
    local currentSpirit = nil
    for key, data in pairs(SpiritData) do
        if nameLabel.Text == data.name:upper() then
            currentSpirit = key
            break
        end
    end
    
    if currentSpirit then
        SignContract:FireServer(currentSpirit)
    end
    
    HideContract()
end)

declineBtn.MouseButton1Click:Connect(function()
    print("CLIENT: Decline clicked")
    HideContract()
end)

print("CLIENT: Ready!")