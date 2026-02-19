-- Client UI for Spirit Contract
-- Place this in StarterPlayerScripts

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local ContractEvent = ReplicatedStorage:WaitForChild("ContractEvent")

-- Create UI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ContractUI"
screenGui.Parent = playerGui

-- Contract popup frame
local contractFrame = Instance.new("Frame")
contractFrame.Size = UDim2.new(0, 400, 0, 300)
contractFrame.Position = UDim2.new(0.5, -200, 0.5, -150)
contractFrame.BackgroundColor3 = Color3.fromRGB(20, 20, 25)
contractFrame.BorderSizePixel = 0
contractFrame.Visible = false
contractFrame.Parent = screenGui

-- Corner radius
local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 12)
corner.Parent = contractFrame

-- Glow border
local stroke = Instance.new("UIStroke")
stroke.Color = Color3.fromRGB(255, 100, 50)
stroke.Thickness = 2
stroke.Parent = contractFrame

-- Title
local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, 0, 0, 50)
title.Position = UDim2.new(0, 0, 0, 10)
title.BackgroundTransparency = 1
title.Text = "SPIRIT CONTRACT"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.Font = Enum.Font.GothamBlack
title.TextSize = 28
title.Parent = contractFrame

-- Spirit name
local spiritName = Instance.new("TextLabel")
spiritName.Size = UDim2.new(1, 0, 0, 30)
spiritName.Position = UDim2.new(0, 0, 0, 55)
spiritName.BackgroundTransparency = 1
spiritName.Text = ""
spiritName.TextColor3 = Color3.fromRGB(255, 100, 50)
spiritName.Font = Enum.Font.GothamBold
spiritName.TextSize = 22
spiritName.Parent = contractFrame

-- Element
local element = Instance.new("TextLabel")
element.Size = UDim2.new(1, 0, 0, 20)
element.Position = UDim2.new(0, 0, 0, 85)
element.BackgroundTransparency = 1
element.Text = ""
element.TextColor3 = Color3.fromRGB(200, 200, 200)
element.Font = Enum.Font.Gotham
element.TextSize = 14
element.Parent = contractFrame

-- Strength label
local strengthLabel = Instance.new("TextLabel")
strengthLabel.Size = UDim2.new(1, -40, 0, 20)
strengthLabel.Position = UDim2.new(0, 20, 0, 120)
strengthLabel.BackgroundTransparency = 1
strengthLabel.Text = "STRENGTH:"
strengthLabel.TextColor3 = Color3.fromRGB(100, 255, 100)
strengthLabel.Font = Enum.Font.GothamBold
strengthLabel.TextSize = 14
strengthLabel.TextXAlignment = Enum.TextXAlignment.Left
strengthLabel.Parent = contractFrame

-- Strength text
local strengthText = Instance.new("TextLabel")
strengthText.Size = UDim2.new(1, -40, 0, 40)
strengthText.Position = UDim2.new(0, 20, 0, 140)
strengthText.BackgroundTransparency = 1
strengthText.Text = ""
strengthText.TextColor3 = Color3.fromRGB(255, 255, 255)
strengthText.Font = Enum.Font.Gotham
strengthText.TextSize = 14
strengthText.TextWrapped = true
strengthText.TextXAlignment = Enum.TextXAlignment.Left
strengthText.Parent = contractFrame

-- Drawback label
local drawbackLabel = Instance.new("TextLabel")
drawbackLabel.Size = UDim2.new(1, -40, 0, 20)
drawbackLabel.Position = UDim2.new(0, 20, 0, 185)
drawbackLabel.BackgroundTransparency = 1
drawbackLabel.Text = "DRAWBACK:"
drawbackLabel.TextColor3 = Color3.fromRGB(255, 100, 100)
drawbackLabel.Font = Enum.Font.GothamBold
drawbackLabel.TextSize = 14
drawbackLabel.TextXAlignment = Enum.TextXAlignment.Left
drawbackLabel.Parent = contractFrame

-- Drawback text
local drawbackText = Instance.new("TextLabel")
drawbackText.Size = UDim2.new(1, -40, 0, 40)
drawbackText.Position = UDim2.new(0, 20, 0, 205)
drawbackText.BackgroundTransparency = 1
drawbackText.Text = ""
drawbackText.TextColor3 = Color3.fromRGB(255, 255, 255)
drawbackText.Font = Enum.Font.Gotham
drawbackText.TextSize = 14
drawbackText.TextWrapped = true
drawbackText.TextXAlignment = Enum.TextXAlignment.Left
drawbackText.Parent = contractFrame

-- Accept button
local acceptBtn = Instance.new("TextButton")
acceptBtn.Size = UDim2.new(0, 150, 0, 40)
acceptBtn.Position = UDim2.new(0, 30, 1, -55)
acceptBtn.BackgroundColor3 = Color3.fromRGB(255, 100, 50)
acceptBtn.Text = "SIGN CONTRACT"
acceptBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
acceptBtn.Font = Enum.Font.GothamBold
acceptBtn.TextSize = 14
acceptBtn.Parent = contractFrame

local acceptCorner = Instance.new("UICorner")
acceptCorner.CornerRadius = UDim.new(0, 8)
acceptCorner.Parent = acceptBtn

-- Decline button
local declineBtn = Instance.new("TextButton")
declineBtn.Size = UDim2.new(0, 150, 0, 40)
declineBtn.Position = UDim2.new(1, -180, 1, -55)
declineBtn.BackgroundColor3 = Color3.fromRGB(60, 60, 70)
declineBtn.Text = "DECLINE"
declineBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
declineBtn.Font = Enum.Font.GothamBold
declineBtn.TextSize = 14
declineBtn.Parent = contractFrame

local declineCorner = Instance.new("UICorner")
declineCorner.CornerRadius = UDim.new(0, 8)
declineCorner.Parent = declineBtn

-- Current spirit data
local currentSpirit = nil

-- Show contract UI
ContractEvent.OnClientEvent:Connect(function(spiritKey, spiritData)
	currentSpirit = spiritKey
	
	spiritName.Text = spiritData.name:upper()
	element.Text = spiritData.element:upper() .. " ELEMENT"
	strengthText.Text = spiritData.strength
	drawbackText.Text = spiritData.drawback
	
	-- Update color theme
	stroke.Color = spiritData.color
	spiritName.TextColor3 = spiritData.color
	acceptBtn.BackgroundColor3 = spiritData.color
	
	contractFrame.Visible = true
end)

-- Handle accept
acceptBtn.MouseButton1Click:Connect(function()
	if currentSpirit then
		ContractEvent:FireServer(currentSpirit, true)
		contractFrame.Visible = false
		
		-- Show success notification
		local notif = Instance.new("TextLabel")
		notif.Size = UDim2.new(0, 300, 0, 50)
		notif.Position = UDim2.new(0.5, -150, 0, 100)
		notif.BackgroundColor3 = Color3.fromRGB(30, 30, 35)
		notif.Text = "CONTRACT SIGNED"
		notif.TextColor3 = Color3.fromRGB(100, 255, 100)
		notif.Font = Enum.Font.GothamBold
		notif.TextSize = 18
		notif.Parent = screenGui
		
		local notifCorner = Instance.new("UICorner")
		notifCorner.CornerRadius = UDim.new(0, 8)
		notifCorner.Parent = notif
		
		local notifStroke = Instance.new("UIStroke")
		notifStroke.Color = Color3.fromRGB(100, 255, 100)
		notifStroke.Thickness = 2
		notifStroke.Parent = notif
		
		wait(2)
		notif:Destroy()
	end
end)

-- Handle decline
declineBtn.MouseButton1Click:Connect(function()
	contractFrame.Visible = false
	currentSpirit = nil
end)

-- Keybind for E
local UserInputService = game:GetService("UserInputService")

UserInputService.InputBegan:Connect(function(input, gameProcessed)
	if gameProcessed then return end
	if input.KeyCode == Enum.KeyCode.E then
		-- Trigger click detector manually if near
		local character = player.Character
		if not character then return end
		
		local hrp = character:FindFirstChild("HumanoidRootPart")
		if not hrp then return end
		
		for _, obj in pairs(workspace:GetDescendants()) do
			if obj:IsA("ClickDetector") then
				local distance = (obj.Parent.Position - hrp.Position).Magnitude
				if distance <= obj.MaxActivationDistance then
					fireclickdetector(obj)
					break
				end
			end
		end
	end
end)

print("Contract UI Loaded!")